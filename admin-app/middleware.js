import { NextResponse } from 'next/server';

const COOKIE_NAME = 'kediengaja_admin_session';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(COOKIE_NAME)?.value;

  // Allow static assets and Next internal requests
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/public') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === '/login';

  // If already authenticated and trying to visit /login, redirect to dashboard
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If unauthenticated and trying to visit protected pages, redirect to /login
  if (!isLoginPage && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
