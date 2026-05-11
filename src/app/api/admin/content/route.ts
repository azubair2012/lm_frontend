import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { contentApi } from '@/lib/api';
import { CONTENT_REGISTRY_BY_KEY, CONTENT_REGISTRY } from '@/lib/content-registry';

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

    // Build set of keys that exist in the API response
    const existingKeys = new Set(allEntries.map((entry) => entry.key));

    // Merge registry entries that have defaults but don't yet exist in site-content.json
    const mergedEntries = [...filteredByGroup];
    for (const definition of Object.values(CONTENT_REGISTRY_BY_KEY)) {
      if (existingKeys.has(definition.key)) continue;
      if (group && definition.group !== group) continue;
      mergedEntries.push({
        key: definition.key,
        label: definition.label,
        group: definition.group,
        type: definition.type,
        value: definition.defaultValue,
        isPublished: false,
        updatedAt: new Date().toISOString(),
      });
    }

    // Filter to only registry keys, and respect `group` so callers don't get unrelated keys
    let filteredByRegistry = mergedEntries.filter((entry) => Boolean(CONTENT_REGISTRY_BY_KEY[entry.key]));
    if (group) {
      filteredByRegistry = filteredByRegistry.filter((entry) => entry.group === group);
    }

    return NextResponse.json({ success: true, data: filteredByRegistry });
  } catch (error) {
    console.error('Error fetching admin content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin content' },
      { status: 500 }
    );
  }
}
