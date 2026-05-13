import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyToken(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const enc = new TextEncoder();
  const key = enc.encode(secret);
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    return payload.exp ? payload.exp > Date.now() / 1000 : false;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-auth')?.value;
    const isAuthenticated = token && await verifyToken(token);

    if (!isAuthenticated) {
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
