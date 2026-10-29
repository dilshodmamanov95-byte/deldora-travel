import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { COOKIE_NAME, createSession, getSessionSecret } from '@/lib/session'

function matches(value: string, expected: string) {
  const a = Buffer.from(value)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  try {
    getSessionSecret()
    const { email, password } = await request.json() as { email?: string; password?: string }
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminEmail || !adminPassword || !email || !password) {
      return NextResponse.json({ error: 'Authentication is not configured' }, { status: 503 })
    }
    if (!matches(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) || !matches(password, adminPassword)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const response = NextResponse.json({ ok: true })
    response.cookies.set(COOKIE_NAME, createSession(adminEmail), {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 8 * 60 * 60,
    })
    return response
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 503 })
  }
}
