import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin/login')) return NextResponse.next()
  if (!pathname.startsWith('/admin')) return NextResponse.next()
  const session = request.cookies.get('deldora_admin_session')?.value
  if (!session) {
    const login = new URL('/admin/login', request.url)
    login.searchParams.set('next', pathname)
    return NextResponse.redirect(login)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
