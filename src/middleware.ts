import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin routes (exclude legacy /admin/login redirect page only)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for auth cookie
    const isAuthenticated = request.cookies.get('admin-auth')?.value === 'authenticated';

    if (!isAuthenticated) {
      // Redirect to login page
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// List `/admin` explicitly: some Next/path-to-regexp versions treat `/admin/:path*`
// as requiring a trailing segment, which would skip the dashboard at `/admin`.
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};



