import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, verifySession } from '@/lib/session'
import { listContent, saveContent, deleteContent } from '@/lib/content-store'

const collections = new Set(['international-tours', 'domestic-tours', 'blog-posts', 'pages', 'site-settings'])

function collectionAllowed(request: NextRequest, collection: string) {
  if (!collections.has(collection)) return false
  if (request.method === 'GET') return true
  try { return Boolean(verifySession(request.cookies.get(COOKIE_NAME)?.value)) } catch { return false }
}

export async function GET(request: NextRequest, context: { params: { collection: string } }) {
  const collection = context.params.collection
  if (!collectionAllowed(request, collection)) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 })
  return NextResponse.json({ docs: await listContent(collection) })
}

export async function POST(request: NextRequest, context: { params: { collection: string } }) {
  const collection = context.params.collection
  if (!collectionAllowed(request, collection)) return NextResponse.json({ error: 'Unauthorized or unknown collection' }, { status: 401 })
  const data = await request.json() as Record<string, unknown>
  if (!data.id && !data.slug) return NextResponse.json({ error: 'id or slug is required' }, { status: 400 })
  const id = String(data.id || data.slug)
  await saveContent(collection, id, data)
  return NextResponse.json({ id, ...data }, { status: 201 })
}

export async function DELETE(request: NextRequest, context: { params: { collection: string } }) {
  const collection = context.params.collection
  if (!collectionAllowed(request, collection)) return NextResponse.json({ error: 'Unauthorized or unknown collection' }, { status: 401 })
  const id = request.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
  await deleteContent(collection, id)
  return NextResponse.json({ ok: true })
}
