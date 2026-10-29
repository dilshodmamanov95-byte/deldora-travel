import { createClient, type Client } from '@libsql/client'
import path from 'path'

let client: Client | undefined

export function getContentClient() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL || `file:${path.join(process.cwd(), 'deldora-content.db')}`
    client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
  }
  return client
}

export async function ensureContentTable() {
  const db = getContentClient()
  await db.execute(`CREATE TABLE IF NOT EXISTS content_items (
    collection TEXT NOT NULL,
    id TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (collection, id)
  )`)
  await db.execute('CREATE INDEX IF NOT EXISTS content_collection_idx ON content_items(collection)')
}

export async function listContent(collection: string) {
  await ensureContentTable()
  const result = await getContentClient().execute({ sql: 'SELECT id, data FROM content_items WHERE collection = ? ORDER BY updated_at DESC', args: [collection] })
  return result.rows.map((row) => ({ id: String(row.id), ...JSON.parse(String(row.data)) }))
}

export async function saveContent(collection: string, id: string, data: Record<string, unknown>) {
  await ensureContentTable()
  await getContentClient().execute({
    sql: `INSERT INTO content_items (collection, id, data, updated_at)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(collection, id) DO UPDATE SET data=excluded.data, updated_at=CURRENT_TIMESTAMP`,
    args: [collection, id, JSON.stringify(data)],
  })
}

export async function deleteContent(collection: string, id: string) {
  await ensureContentTable()
  await getContentClient().execute({ sql: 'DELETE FROM content_items WHERE collection = ? AND id = ?', args: [collection, id] })
}
