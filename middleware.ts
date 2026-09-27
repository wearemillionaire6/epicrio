import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // When accessing port 3001 at root '/', transparently rewrite to the studio agency page
  if (host.includes(':3001') && pathname === '/') {
    return NextResponse.rewrite(new URL('/studio', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
