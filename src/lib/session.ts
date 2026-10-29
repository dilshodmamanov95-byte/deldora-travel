import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'deldora_admin_session'

export function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET must contain at least 32 characters')
  return secret
}

export function createSession(email: string, role = 'admin') {
  const payload = JSON.stringify({ email, role, expiresAt: Date.now() + 8 * 60 * 60 * 1000 })
  const encoded = Buffer.from(payload).toString('base64url')
  const signature = createHmac('sha256', getSessionSecret()).update(encoded).digest('base64url')
  return `${encoded}.${signature}`
}

export function verifySession(session?: string) {
  if (!session) return null
  const [encoded, signature] = session.split('.')
  if (!encoded || !signature) return null
  const expected = createHmac('sha256', getSessionSecret()).update(encoded).digest('base64url')
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'))
    if (payload.expiresAt < Date.now()) return null
    return payload as { email: string; role: string; expiresAt: number }
  } catch {
    return null
  }
}

export { COOKIE_NAME }
