import { NextRequest, NextResponse } from 'next/server';
import { contentApi } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const keysParam = request.nextUrl.searchParams.get('keys');
    const keys = keysParam
      ? keysParam
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean)
      : undefined;

    const entries = await contentApi.getContent(keys, false);
    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    console.error('Error fetching public content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
