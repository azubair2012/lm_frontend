import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const configured = process.env.ADMIN_PASSWORD?.trim();
    if (process.env.NODE_ENV === 'production' && !configured) {
      console.error('ADMIN_PASSWORD is not set; refusing admin login');
      return NextResponse.json(
        { success: false, error: 'Admin login is not configured' },
        { status: 503 }
      );
    }

    // Dev-only fallback when unset — never use in production (guarded above)
    const adminPassword = configured || 'admin123';

    const { password } = await request.json();

    if (password === adminPassword) {
      // Set auth cookie (expires in 24 hours)
      const cookieStore = await cookies();
      cookieStore.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}



