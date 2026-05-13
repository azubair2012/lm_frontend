import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

async function verifyToken(cookieValue?: string): Promise<boolean> {
  if (!cookieValue) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const enc = new TextEncoder();
  const key = enc.encode(secret);
  try {
    const { payload } = await jwtVerify(cookieValue, key, { algorithms: ['HS256'] });
    return payload.exp ? payload.exp > Date.now() / 1000 : false;
  } catch {
    return false;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = await verifyToken(cookieStore.get('admin-auth')?.value);

  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
