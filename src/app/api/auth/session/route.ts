import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, verifySession } from '@/lib/session'
export async function GET(request: NextRequest) {
  try {
    const session = verifySession(request.cookies.get(COOKIE_NAME)?.value)
    return NextResponse.json(session ? { authenticated: true, user: session } : { authenticated: false })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
