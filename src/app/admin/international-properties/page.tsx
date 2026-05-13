'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyData } from '@/app/international-properties/types';
import { DEFAULT_INTERNATIONAL_PROPERTIES } from '@/lib/content-registry';

const INTERNATIONAL_CONTENT_KEY = 'international.properties';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dbj2rsthw';
const UPLOAD_PRESET = 'international_properties';

/** Cloudinary upload limit for the current plan (bytes). */
const MAX_CLOUDINARY_UPLOAD_BYTES = 10 * 1024 * 1024;

function formatFileSizeMb(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(1);
}

function UploadProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full max-w-[280px]">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Uploading</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#B87333] rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function MapButton({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > MAX_CLOUDINARY_UPLOAD_BYTES) {
        setError(
          `This PDF is ${formatFileSizeMb(file.size)} MB. The maximum upload size is ${formatFileSizeMb(MAX_CLOUDINARY_UPLOAD_BYTES)} MB. Compress the file offline or use “Paste URL" with a link hosted elsewhere.`
        );
        return;
      }

      setUploading(true);
      setProgress(0);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'international');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress((e.loaded / e.total) * 100);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.secure_url) {
            onUpload(data.secure_url);
          } else if (data.error?.message) {
            setError(data.error.message);
          } else {
            setError('Upload failed. Please try again or use “Paste URL".');
          }
        } else {
          setError('Upload failed. Please try again or use “Paste URL".');
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setError('Upload failed (network error). Check your connection or use “Paste URL".');
      };

      xhr.send(formData);
    };

    input.click();
  };

  return (
    <div className="flex flex-col gap-1 max-w-md">
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="px-3 py-2 bg-[#B87333] text-white text-sm hover:bg-[#A0662A] rounded-md transition-colors disabled:opacity-60 whitespace-nowrap self-start"
      >
        {uploading ? 'Uploading...' : 'Upload Map'}
      </button>
      {uploading && <UploadProgressBar progress={progress} />}
      <p className="text-xs text-gray-500 leading-snug">
        PDFs up to {Math.round(MAX_CLOUDINARY_UPLOAD_BYTES / (1024 * 1024))} MB.
      </p>
      {error ? <p className="text-xs text-red-600 leading-snug">{error}</p> : null}
    </div>
  );
}

function BrochureButton({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > MAX_CLOUDINARY_UPLOAD_BYTES) {
        setError(
          `This PDF is ${formatFileSizeMb(file.size)} MB. The maximum upload size is ${formatFileSizeMb(MAX_CLOUDINARY_UPLOAD_BYTES)} MB. Compress the file offline or use “Paste URL" with a link hosted elsewhere.`
        );
        return;
      }

      setUploading(true);
      setProgress(0);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'international');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress((e.loaded / e.total) * 100);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.secure_url) {
            onUpload(data.secure_url);
          } else if (data.error?.message) {
            setError(data.error.message);
          } else {
            setError('Upload failed. Please try again or use “Paste URL".');
          }
        } else {
          setError('Upload failed. Please try again or use “Paste URL".');
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setError('Upload failed (network error). Check your connection or use “Paste URL".');
      };

      xhr.send(formData);
    };

    input.click();
  };

  return (
    <div className="flex flex-col gap-1 max-w-md">
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="px-3 py-2 bg-[#B87333] text-white text-sm hover:bg-[#A0662A] rounded-md transition-colors disabled:opacity-60 whitespace-nowrap self-start"
      >
        {uploading ? 'Uploading...' : 'Upload PDF'}
      </button>
      {uploading && <UploadProgressBar progress={progress} />}
      <p className="text-xs text-gray-500 leading-snug">
        PDFs up to {Math.round(MAX_CLOUDINARY_UPLOAD_BYTES / (1024 * 1024))} MB.
      </p>
      {error ? <p className="text-xs text-red-600 leading-snug">{error}</p> : null}
    </div>
  );
}

function UploadButton({
  onUpload,
  multi = false,
  hint,
}: {
  onUpload: (url: string) => void;
  onMultiUpload?: (urls: string) => void;
  multi?: boolean;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = multi;

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files?.length) return;

      const filesArr = Array.from(files);
      for (const file of filesArr) {
        if (file.size > MAX_CLOUDINARY_UPLOAD_BYTES) {
          setError(
            `This image is ${formatFileSizeMb(file.size)} MB. The maximum upload size is ${formatFileSizeMb(MAX_CLOUDINARY_UPLOAD_BYTES)} MB. Use a smaller file or paste a URL.`
          );
          return;
        }
      }

      setUploading(true);
      setProgress(0);
      setError(null);

      const uploadedUrls: string[] = [];
      let currentFileIdx = 0;

      const uploadNext = () => {
        if (currentFileIdx >= filesArr.length) {
          setUploading(false);
          if (uploadedUrls.length === 1) {
            onUpload(uploadedUrls[0]);
          } else if (uploadedUrls.length > 1) {
            onUpload(uploadedUrls.join('\n'));
          }
          return;
        }

        const file = filesArr[currentFileIdx];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('folder', 'international');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const fileProgress = (currentFileIdx + e.loaded / e.total) / filesArr.length * 100;
            setProgress(fileProgress);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            if (data.secure_url) {
              uploadedUrls.push(data.secure_url);
              currentFileIdx++;
              uploadNext();
            } else if (data.error?.message) {
              setUploading(false);
              setError(data.error.message);
            } else {
              setUploading(false);
              setError('Upload failed. Try again or paste a URL.');
            }
          } else {
            setUploading(false);
            setError('Upload failed. Try again or paste a URL.');
          }
        };

        xhr.onerror = () => {
          setUploading(false);
          setError('Upload failed (network error). Check your connection or paste a URL.');
        };

        xhr.send(formData);
      };

      uploadNext();
    };

    input.click();
  };

  return (
    <div className="flex flex-col gap-1 max-w-md">
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="px-3 py-2 bg-[#B87333] text-white text-sm hover:bg-[#A0662A] rounded-md transition-colors disabled:opacity-60 whitespace-nowrap self-start"
      >
        {uploading ? 'Uploading...' : multi ? 'Upload Images' : 'Upload Image'}
      </button>
      {uploading && <UploadProgressBar progress={progress} />}
      {hint ? <p className="text-xs text-gray-500 leading-snug">{hint}</p> : null}
      {error ? <p className="text-xs text-red-600 leading-snug">{error}</p> : null}
    </div>
  );
}

export default function AdminInternationalPropertiesPage() {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<PropertyData>>({});
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content?group=international');
      const payload = await res.json();
      if (!payload.success) {
        setError(
          payload.error === 'Unauthorized'
            ? 'Sign in at /login first.'
            : 'Failed to load properties'
        );
        setProperties([]);
        return;
      }
      const entry = payload.data?.find(
        (row: { key: string; value?: string }) => row.key === INTERNATIONAL_CONTENT_KEY
      );
      if (entry?.value) {
        try {
          setProperties(JSON.parse(entry.value) as PropertyData[]);
        } catch {
          setProperties(DEFAULT_INTERNATIONAL_PROPERTIES);
        }
      } else {
        setProperties(DEFAULT_INTERNATIONAL_PROPERTIES);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading properties:', err);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const saveProperties = async (updatedProperties: PropertyData[]) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/content/international.properties', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: JSON.stringify(updatedProperties, null, 2),
          isPublished: true,
        }),
      });
      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.error || 'Failed to save');
      }
      setProperties(updatedProperties);
      setEditingIndex(null);
    } catch (err) {
      console.error('Error saving properties:', err);
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Delete this property?')) return;
    const updated = properties.filter((_, i) => i !== index);
    await saveProperties(updated);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...properties[index] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    if (!editForm.title || !editForm.image || !editForm.cardDescription) {
      setError('Title, image, and card description are required.');
      return;
    }
    const updated = [...properties];
    updated[editingIndex!] = editForm as PropertyData;
    await saveProperties(updated);
  };

  const handleAddNew = () => {
    setEditingIndex(-1);
    setEditForm({
      title: '',
      blurb: '',
      cardDescription: '',
      image: '',
      images: [],
      modalDescription: [],
      ctas: [],
    });
  };

  const handleSaveNew = async () => {
    if (!editForm.title || !editForm.image || !editForm.cardDescription) {
      setError('Title, image, and card description are required.');
      return;
    }
    await saveProperties([...properties, editForm as PropertyData]);
  };

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111518]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
              International Properties
            </h1>
            <div className="flex gap-2">
              <Link
                href="/admin"
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                Admin Home
              </Link>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-[#B87333] text-white hover:bg-[#A0662A] rounded-md transition-colors"
              >
                Add New Property
              </button>
            </div>
          </div>
          <p className="text-gray-600">Manage international property listings. Changes publish immediately.</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-700 mb-4">{error}</div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">Loading...</div>
        ) : (
          <div className="space-y-4">
            {properties.map((property: PropertyData, index: number) => (
              <div key={property.title} className="bg-white rounded-lg border border-gray-200 p-4">
                {editingIndex === index ? (
                  <PropertyEditForm
                    form={editForm}
                    onChange={setEditForm}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                    saving={saving}
                  />
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover rounded"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-property.jpg'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#111518]">{property.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{property.cardDescription}</p>
                      <p className="text-xs text-gray-400 mt-1">{property.images.length} images, {property.ctas.length} CTAs</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {properties.length === 0 && !loading && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
                No properties yet. Click "Add New Property" to create one.
              </div>
            )}
          </div>
        )}

        {editingIndex === -1 && (
          <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">New Property</h3>
            <PropertyEditForm
              form={editForm}
              onChange={setEditForm}
              onSave={handleSaveNew}
              onCancel={handleCancelEdit}
              saving={saving}
            />
          </div>
        )}
      </div>
    </main>
  );
}

type PropertyEditFormProps = {
  form: Partial<PropertyData>;
  onChange: (form: Partial<PropertyData>) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
};

function PropertyEditForm({ form, onChange, onSave, onCancel, saving }: PropertyEditFormProps) {
  const removeHeroImage = (index: number) => {
    const imgs = [...(form.images || [])];
    imgs.splice(index, 1);
    onChange({ ...form, images: imgs });
  };

  const updateCta = (index: number, field: 'label' | 'href', value: string) => {
    const newCtas = [...(form.ctas || [])];
    newCtas[index] = { ...newCtas[index], [field]: value };
    onChange({ ...form, ctas: newCtas });
  };

  const addCta = () => {
    onChange({ ...form, ctas: [...(form.ctas || []), { label: '', href: '#' }] });
  };

  const removeCta = (index: number) => {
    const newCtas = (form.ctas || []).filter((_: { label: string; href: string }, i: number) => i !== index);
    onChange({ ...form, ctas: newCtas });
  };

  const addModalParagraph = () => {
    onChange({ ...form, modalDescription: [...(form.modalDescription || []), ''] });
  };

  const updateModalParagraph = (index: number, value: string) => {
    const newParagraphs = [...(form.modalDescription || [])];
    newParagraphs[index] = value;
    onChange({ ...form, modalDescription: newParagraphs });
  };

  const removeModalParagraph = (index: number) => {
    const newParagraphs = (form.modalDescription || []).filter((_: string, i: number) => i !== index);
    onChange({ ...form, modalDescription: newParagraphs });
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={form.title || ''}
          onChange={(e) => onChange({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Card Image</label>
        <div className="flex flex-wrap gap-4 mb-3 rounded-lg border-2 border-gray-300 bg-gray-50/80 p-4 min-h-[4.5rem]">
          {form.image ? (
            <div className="relative w-full max-w-[12.6rem] aspect-[16/10] min-h-[66px] rounded-lg border border-gray-200 overflow-hidden bg-gray-100 group shrink-0">
              <Image
                src={form.image}
                alt="Card preview"
                fill
                unoptimized
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-property.jpg';
                }}
              />
              <button
                type="button"
                onClick={() => onChange({ ...form, image: '' })}
                className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/60 text-white text-sm leading-none hover:bg-black/80 flex items-center justify-center"
                aria-label="Remove card image"
              >
                ×
              </button>
            </div>
          ) : null}
        </div>
        {!form.image ? (
          <p className="text-sm text-gray-500 mb-3">No card image yet.</p>
        ) : null}
        <div className="flex flex-wrap gap-2 items-start">
          <UploadButton
            hint={`Image up to ${Math.round(MAX_CLOUDINARY_UPLOAD_BYTES / (1024 * 1024))} MB.`}
            onUpload={(url) => onChange({ ...form, image: url })}
          />
          <details className="text-sm flex-1 min-w-[200px] rounded-lg border-2 border-gray-300 bg-gray-50/80 py-1 px-3 leading-snug open:py-2">
            <summary className="cursor-pointer list-none font-bold text-gray-700 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
              Image URL (advanced)
            </summary>
            <input
              type="text"
              value={form.image || ''}
              onChange={(e) => onChange({ ...form, image: e.target.value })}
              placeholder="https://..."
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333] font-mono text-xs"
            />
          </details>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Detail Images</label>
        <div className="flex flex-wrap gap-4 mb-3 rounded-lg border-2 border-gray-300 bg-gray-50/80 p-4 min-h-[4.5rem]">
          {(form.images || []).map((url: string, idx: number) => (
            <div
              key={`${idx}-${url.slice(0, 48)}`}
              className="relative w-full max-w-[12.6rem] aspect-[16/10] min-h-[66px] rounded-lg border border-gray-200 overflow-hidden bg-gray-100 group shrink-0"
            >
              <Image
                src={url}
                alt={`Detail ${idx + 1}`}
                fill
                unoptimized
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-property.jpg';
                }}
              />
              <button
                type="button"
                onClick={() => removeHeroImage(idx)}
                className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/60 text-white text-sm leading-none hover:bg-black/80 flex items-center justify-center"
                aria-label={`Remove detail image ${idx + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {(form.images || []).length === 0 ? (
          <p className="text-sm text-gray-500 mb-3">No detail images yet.</p>
        ) : null}
        <div className="flex flex-wrap gap-2 items-start">
          <UploadButton
            multi
            hint={`Each image up to ${Math.round(MAX_CLOUDINARY_UPLOAD_BYTES / (1024 * 1024))} MB.`}
            onUpload={(urls) => {
              const current = (form.images || []).join('\n');
              const newUrls = current ? current + '\n' + urls : urls;
              onChange({ ...form, images: newUrls.split('\n').filter(Boolean) });
            }}
          />
          <details className="text-sm flex-1 min-w-[200px] rounded-lg border-2 border-gray-300 bg-gray-50/80 py-1 px-3 leading-snug open:py-2">
            <summary className="cursor-pointer list-none font-bold text-gray-700 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
              Paste URLs (one per line)
            </summary>
            <textarea
              value={(form.images || []).join('\n')}
              onChange={(e) => onChange({ ...form, images: e.target.value.split('\n').filter(Boolean) })}
              rows={4}
              placeholder="https://..."
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333] font-mono text-xs"
            />
          </details>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Modal Description (paragraphs)</label>
        {(form.modalDescription || []).map((para: string, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2">
            <textarea
              value={para}
              onChange={(e) => updateModalParagraph(idx, e.target.value)}
              rows={2}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
            />
            <button
              onClick={() => removeModalParagraph(idx)}
              className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
            >
              ×
            </button>
          </div>
        ))}
        <button onClick={addModalParagraph} className="text-sm text-blue-600 hover:underline">
          + Add paragraph
        </button>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">CTAs</label>
        {(form.ctas || []).map((cta: { label: string; href: string }, idx: number) => (
          <div key={idx} className="space-y-2 mb-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={cta.label}
                onChange={(e) => updateCta(idx, 'label', e.target.value)}
                placeholder="Label"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
              />
              {cta.label.toLowerCase().includes('brochure') && (
                <BrochureButton onUpload={(url) => updateCta(idx, 'href', url)} />
              )}
              {cta.label.toLowerCase().includes('map') && (
                <MapButton onUpload={(url) => updateCta(idx, 'href', url)} />
              )}
              <button
                type="button"
                onClick={() => removeCta(idx)}
                className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <button onClick={addCta} className="text-sm text-blue-600 hover:underline">
          + Add CTA
        </button>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-[#B87333] text-white hover:bg-[#A0662A] rounded-md transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}