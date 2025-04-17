import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { path } from '@/lib/utils'
import { USER } from './lib/config'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(USER.storageKey)?.value === 'true'
  const isDashboardRoute = request.nextUrl.pathname.startsWith(path.DASHBOARD)
  const isHomeRoute = request.nextUrl.pathname === path.HOME

  if (isDashboardRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(path.HOME, request.url))
  }

  if (isHomeRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(path.DEPOSIT, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|serviceWorker).*)',
}
