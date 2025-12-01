import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for auth cookie
    const isAuthenticated = request.cookies.get('admin-auth')?.value === 'authenticated';

    if (!isAuthenticated) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

