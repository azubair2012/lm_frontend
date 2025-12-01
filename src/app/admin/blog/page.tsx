'use client';

import { useEffect, useState } from 'react';
import { blogApi, BlogPost, BlogPostInput } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const posts = await blogApi.getAllBlogs();
      setBlogs(posts);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blog posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await blogApi.deleteBlog(id);
      await fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog post.');
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="container mx-auto">
          <p className="text-lg">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111518]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
              Blog Management
            </h1>
            <div className="flex gap-2">
              <Link
                href="/admin"
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                Admin Home
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                View Blog
              </Link>
              <button
                onClick={handleNew}
                className="px-4 py-2 text-sm bg-[#B87333] text-white hover:bg-[#A0662A] rounded-md transition-colors"
              >
                + New Post
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>

        {/* Blog List */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">No blog posts yet.</p>
            <button
              onClick={handleNew}
              className="px-6 py-2 bg-[#B87333] text-white hover:bg-[#A0662A] rounded-md transition-colors"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-[#B87333] bg-[#B87333]/10 rounded-full">
                        {blog.category}
                      </span>
                      <span className="text-sm text-gray-500">ID: {blog.id}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#111518] mb-1" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{blog.subtitle}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{blog.excerpt}</p>
                    {blog.updatedAt && (
                      <p className="text-xs text-gray-400 mt-2">
                        Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog.id)}
                      className="px-4 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-4 py-2 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <BlogForm
            blog={editingId ? blogs.find(b => b.id === editingId) : undefined}
            onClose={handleFormClose}
            onSave={async () => {
              await fetchBlogs();
              handleFormClose();
            }}
          />
        )}
      </div>
    </main>
  );
}

interface BlogFormProps {
  blog?: BlogPost;
  onClose: () => void;
  onSave: () => void;
}

function BlogForm({ blog, onClose, onSave }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPostInput>({
    category: blog?.category || '',
    title: blog?.title || '',
    subtitle: blog?.subtitle || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || [''],
    links: blog?.links || [{ label: '', href: '' }],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Clean up empty content paragraphs and links
      const cleanedContent = formData.content.filter(p => p.trim() !== '');
      const cleanedLinks = formData.links.filter(l => l.label.trim() !== '' && l.href.trim() !== '');

      if (cleanedContent.length === 0) {
        setError('At least one content paragraph is required.');
        setSaving(false);
        return;
      }

      const input: BlogPostInput = {
        ...formData,
        content: cleanedContent,
        links: cleanedLinks.length > 0 ? cleanedLinks : [],
      };

      if (blog) {
        await blogApi.updateBlog(blog.id, input);
      } else {
        await blogApi.createBlog(input);
      }

      onSave();
    } catch (err) {
      console.error('Error saving blog:', err);
      setError('Failed to save blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addContentParagraph = () => {
    setFormData({
      ...formData,
      content: [...formData.content, ''],
    });
  };

  const removeContentParagraph = (index: number) => {
    setFormData({
      ...formData,
      content: formData.content.filter((_, i) => i !== index),
    });
  };

  const updateContentParagraph = (index: number, value: string) => {
    const newContent = [...formData.content];
    newContent[index] = value;
    setFormData({ ...formData, content: newContent });
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { label: '', href: '' }],
    });
  };

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    });
  };

  const updateLink = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, links: newLinks });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#111518]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
            {blog ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle *
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
              rows={3}
              required
            />
          </div>

          {/* Content Paragraphs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Content Paragraphs *
              </label>
              <button
                type="button"
                onClick={addContentParagraph}
                className="text-sm text-[#B87333] hover:text-[#A0662A]"
              >
                + Add Paragraph
              </button>
            </div>
            {formData.content.map((paragraph, index) => (
              <div key={index} className="mb-3 flex gap-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => updateContentParagraph(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                  rows={4}
                  placeholder={`Paragraph ${index + 1}`}
                />
                {formData.content.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContentParagraph(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Links */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Links (Optional)
              </label>
              <button
                type="button"
                onClick={addLink}
                className="text-sm text-[#B87333] hover:text-[#A0662A]"
              >
                + Add Link
              </button>
            </div>
            {formData.links.map((link, index) => (
              <div key={index} className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateLink(index, 'label', e.target.value)}
                  placeholder="Link label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateLink(index, 'href', e.target.value)}
                  placeholder="/path"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                />
                {formData.links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#B87333] text-white hover:bg-[#A0662A] rounded-md transition-colors disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : blog ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

