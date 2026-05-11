'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogApi } from '@/lib/api';

export default function AdminPage() {
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const blogs = await blogApi.getAllBlogs();
        setBlogCount(blogs.length);
      } catch (err) {
        console.error('Error fetching blog count:', err);
      }
    };

    fetchBlogCount();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const adminSections = [
    {
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts',
      href: '/admin/blog',
      icon: '📝',
      count: blogCount,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      textColor: 'text-blue-700',
    },
    {
      title: 'Site Content',
      description: 'Edit homepage and section copy',
      href: '/admin/content',
      icon: '🧩',
      count: null,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      textColor: 'text-purple-700',
    },
    {
      title: 'International Properties',
      description: 'Manage international property listings',
      href: '/admin/international-properties',
      icon: '🌍',
      count: null,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      textColor: 'text-green-700',
    },
  ];

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111518] mb-2" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                London Move Admin
              </h1>
              <p className="text-lg text-gray-600">
                Manage your website content and settings
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#111518] mb-4" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
            Admin Sections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`block p-6 rounded-lg border-2 transition-all hover:shadow-md ${section.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{section.icon}</div>
                  {section.count !== null && (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${section.textColor} bg-white`}>
                      {section.count}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[#111518] mb-2" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-[#B87333]">
                  Manage →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-[#111518] mb-4" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/blog"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">View Public Blog</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">View Homepage</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/properties"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">View Properties</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">View Contact</span>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

