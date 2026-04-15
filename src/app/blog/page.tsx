'use client';

import { useEffect, useState } from 'react';
import ImageSlideShow from '@/components/ImageSlideShow';
import Link from 'next/link';
import { blogApi, BlogPost } from '@/lib/api';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const posts = await blogApi.getAllBlogs();
        setBlogPosts(posts);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <ImageSlideShow />
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-muted-foreground">Loading blog posts...</p>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <ImageSlideShow />
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[48px] sm:text-[64px] md:text-[80px] text-black uppercase"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
            >
              Blog
            </span>
           
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mx-auto max-w-6xl space-y-16 sm:space-y-20 md:space-y-24">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No blog posts available yet.</p>
            </div>
          ) : (
            blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative"
            >
              {/* Card Container */}
              <div className="bg-white/80 backdrop-blur-sm border border-[#e5e7eb]/50 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 hover:shadow-xl hover:border-[#B87333]/30">
                {/* Category Badge */}
                <div className="mb-4 sm:mb-6">
                  <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#B87333] bg-[#B87333]/10 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title Section */}
                <header className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111518] mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                    {post.title}
                  </h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-[#383E42] mb-4 sm:mb-6 leading-relaxed" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                    {post.subtitle}
                  </h3>
                  <div className="h-px w-20 bg-[#B87333] mb-6"></div>
                </header>

                {/* Excerpt */}
                <p className="text-base sm:text-lg text-[#383E42] mb-6 sm:mb-8 leading-relaxed font-medium" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 400 }}>
                  {post.excerpt}
                </p>

                {/* Content */}
                <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                  {post.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-sm sm:text-base text-[#383E42] leading-7 sm:leading-8"
                      style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Links Section */}
                <footer className="pt-6 sm:pt-8 border-t border-[#e5e7eb]">
                  <p className="text-xs sm:text-sm text-[#8c8c8c] mb-3 sm:mb-4 italic" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                    Suggested links:
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {post.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="inline-block px-3 py-1.5 text-xs sm:text-sm text-[#383E42] bg-[#f6f4f2] hover:bg-[#B87333] hover:text-white rounded-md transition-colors cursor-pointer"
                        style={{ fontFamily: 'Public Sans, sans-serif' }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </footer>
              </div>

              {/* Divider between posts (except last) */}
              {index < blogPosts.length - 1 && (
                <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
                  <div className="h-px w-24 bg-[#B87333]/20"></div>
                </div>
              )}
            </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
