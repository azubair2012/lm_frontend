import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const rateLimitMap = new Map<
  string,
  { count: number; lastAttempt: number; lockedUntil: number }
>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwarded) return forwarded;
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const entry = rateLimitMap.get(ip);
  if (!entry) return false;
  if (Date.now() < entry.lockedUntil) return true;
  rateLimitMap.delete(ip);
  return false;
}

function recordFailure(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.lastAttempt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastAttempt: now, lockedUntil: 0 });
  } else {
    entry.count += 1;
    entry.lastAttempt = now;
    if (entry.count >= RATE_LIMIT_MAX) {
      entry.lockedUntil = now + RATE_LIMIT_WINDOW_MS;
    }
    rateLimitMap.set(ip, entry);
  }
}

function recordSuccess(ip: string): void {
  rateLimitMap.delete(ip);
}

function getPasswordHash(): { hash: Buffer; salt: string } {
  const configured = process.env.ADMIN_PASSWORD?.trim();
  if (process.env.NODE_ENV === 'production' && !configured) {
    throw new Error('ADMIN_PASSWORD is not set');
  }
  const rawPassword = configured || 'admin123';
  const salt = process.env.ADMIN_PASSWORD_SALT || 'london-move-admin-salt-v1';
  const hash = crypto.pbkdf2Sync(rawPassword, salt, 100000, 64, 'sha256');
  return { hash, salt };
}

function verifyPassword(input: string, hash: Buffer, salt: string): boolean {
  const inputHash = crypto.pbkdf2Sync(input, salt, 100000, 64, 'sha256');
  return crypto.timingSafeEqual(inputHash, hash);
}

async function signSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set');
  const enc = new TextEncoder();
  const key = enc.encode(secret);
  return new SignJWT({ seq: Date.now() })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(key);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    );
  }

  try {
    const { password } = await request.json();
    const { hash, salt } = getPasswordHash();

    if (verifyPassword(password, hash, salt)) {
      recordSuccess(ip);
      const token = await signSessionToken();
      const cookieStore = await cookies();
      cookieStore.set('admin-auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      return NextResponse.json({ success: true });
    } else {
      recordFailure(ip);
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
