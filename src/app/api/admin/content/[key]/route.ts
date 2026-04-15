import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { contentApi } from '@/lib/api';
import { CONTENT_REGISTRY_BY_KEY } from '@/lib/content-registry';

function isAuthenticatedAdmin(cookieValue?: string) {
  return cookieValue === 'authenticated';
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (!isAuthenticatedAdmin(cookieStore.get('admin-auth')?.value)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { key: encodedKey } = await context.params;
    const key = decodeURIComponent(encodedKey);
    const definition = CONTENT_REGISTRY_BY_KEY[key];
    if (!definition) {
      return NextResponse.json(
        { success: false, error: 'Unknown content key' },
        { status: 400 }
      );
    }

    const body = (await request.json()) as { value?: string; isPublished?: boolean };
    const value = (body.value || '').trim();
    if (!value) {
      return NextResponse.json(
        { success: false, error: 'Content value is required' },
        { status: 400 }
      );
    }

    const updated = await contentApi.updateContentByKey(key, {
      value,
      isPublished: body.isPublished ?? true,
      label: definition.label,
      group: definition.group,
      type: definition.type,
      updatedBy: 'admin',
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating admin content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
