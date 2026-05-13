'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CONTENT_REGISTRY_BY_KEY } from '@/lib/content-registry';
import { ContentEntry } from '@/lib/api';
import RichTextEditor from '@/components/admin/RichTextEditor';

type EntryState = ContentEntry & { draftValue: string; saving?: boolean; saveError?: string };

export default function AdminContentPage() {
  const [entries, setEntries] = useState<EntryState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/content');
        const payload = (await response.json()) as { success: boolean; data?: ContentEntry[]; error?: string };
        if (!response.ok || !payload.success || !payload.data) {
          throw new Error(payload.error || 'Failed to load content');
        }

        const normalized = payload.data
          .filter((entry) => entry.key !== 'international.properties')
          .map((entry) => ({
            ...entry,
            draftValue: entry.value,
          }));
        setEntries(normalized);
        setError(null);
      } catch (err) {
        console.error('Error loading admin content:', err);
        setError('Failed to load content entries.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const groupedEntries = useMemo(() => {
    return entries.reduce<Record<string, EntryState[]>>((acc, entry) => {
      if (!acc[entry.group]) {
        acc[entry.group] = [];
      }
      acc[entry.group].push(entry);
      return acc;
    }, {});
  }, [entries]);

  const updateDraft = (key: string, value: string) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.key === key ? { ...entry, draftValue: value, saveError: undefined } : entry))
    );
  };

  const saveEntry = async (key: string) => {
    const target = entries.find((entry) => entry.key === key);
    if (!target) return;

    const trimmed = target.draftValue.trim();
    if (!trimmed) {
      setEntries((prev) => prev.map((entry) => (entry.key === key ? { ...entry, saveError: 'Value cannot be empty.' } : entry)));
      return;
    }

    setEntries((prev) => prev.map((entry) => (entry.key === key ? { ...entry, saving: true, saveError: undefined } : entry)));

    try {
      const response = await fetch(`/api/admin/content/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: trimmed, isPublished: target.isPublished }),
      });
      const payload = (await response.json()) as { success: boolean; data?: ContentEntry; error?: string };
      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error || 'Failed to save content');
      }

      setEntries((prev) =>
        prev.map((entry) =>
          entry.key === key
            ? { ...entry, ...payload.data!, draftValue: payload.data!.value, saving: false, saveError: undefined }
            : entry
        )
      );
    } catch (err) {
      console.error('Error saving content:', err);
      setEntries((prev) =>
        prev.map((entry) =>
          entry.key === key ? { ...entry, saving: false, saveError: 'Failed to save. Please try again.' } : entry
        )
      );
    }
  };

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111518]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
              Site Content
            </h1>
            <div className="flex gap-2">
              <Link href="/admin" className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
                Admin Home
              </Link>
              <Link href="/" className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
                View Homepage
              </Link>
            </div>
          </div>
          <p className="text-gray-600">Edit homepage and section copy without redeploying.</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">Loading content entries...</div>
        ) : error ? (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-700">{error}</div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEntries).map(([group, groupEntries]) => (
              <section key={group} className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-[#111518] mb-4 capitalize">{group}</h2>
                <div className="space-y-6">
                  {groupEntries.map((entry) => {
                    const definition = CONTENT_REGISTRY_BY_KEY[entry.key];
                    return (
                      <div key={entry.key} className="border border-gray-200 rounded-md p-4">
                        <p className="font-semibold text-[#111518] mb-3">{definition?.label || entry.label}</p>
                        {definition?.type === 'richtext' ? (
                          <RichTextEditor
                            value={entry.draftValue}
                            onChange={(value) => updateDraft(entry.key, value)}
                          />
                        ) : (
                          <textarea
                            className="w-full min-h-[140px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                            value={entry.draftValue}
                            onChange={(e) => updateDraft(entry.key, e.target.value)}
                          />
                        )}
                        {entry.key === 'home.about.description' && (
                          <p className="mt-2 text-xs text-gray-500">
                            Use a blank line to separate paragraphs (first paragraph, then second paragraph).
                          </p>
                        )}
                        {definition?.type === 'richtext' && (
                          <p className="mt-2 text-xs text-gray-500">
                            Rich text mode: use blank lines to create paragraphs.
                          </p>
                        )}
                        {entry.saveError && <p className="mt-2 text-sm text-red-600">{entry.saveError}</p>}
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-xs text-gray-500">Updated: {new Date(entry.updatedAt).toLocaleString()}</p>
                          <button
                            onClick={() => saveEntry(entry.key)}
                            disabled={entry.saving}
                            className="px-4 py-2 text-sm bg-[#B87333] text-white hover:bg-[#A0662A] rounded-md transition-colors disabled:opacity-60"
                          >
                            {entry.saving ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
