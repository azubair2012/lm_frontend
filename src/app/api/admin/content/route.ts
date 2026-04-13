import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { contentApi } from '@/lib/api';
import { CONTENT_REGISTRY_BY_KEY } from '@/lib/content-registry';

function isAuthenticatedAdmin(cookieValue?: string) {
  return cookieValue === 'authenticated';
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (!isAuthenticatedAdmin(cookieStore.get('admin-auth')?.value)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const group = request.nextUrl.searchParams.get('group');
    const allEntries = await contentApi.getContent(undefined, true);
    const filteredByGroup = group ? allEntries.filter((entry) => entry.group === group) : allEntries;
    const filteredByRegistry = filteredByGroup.filter((entry) => Boolean(CONTENT_REGISTRY_BY_KEY[entry.key]));

    return NextResponse.json({ success: true, data: filteredByRegistry });
  } catch (error) {
    console.error('Error fetching admin content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin content' },
      { status: 500 }
    );
  }
}
