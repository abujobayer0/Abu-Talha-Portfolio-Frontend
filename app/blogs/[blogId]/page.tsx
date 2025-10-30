'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getSingleBlog } from '@/service/blogService/blogService';
import { TBlog } from '@/types';

const BlogCard = dynamic(() => import('@/app/(home)/_components/module/blogs/blogCard').then((mod) => mod.BlogCard), { ssr: false });

export default function BlogDetailsPage(props: any) {
  const { blogId } = props.params || {};
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    getSingleBlog(blogId)
      .then((data) => {
        if (!mounted) return;
        setBlog(data?.data || null);
        setLoading(false);
      })
      .catch((err) => {
        if (mounted) {
          setError('Could not load blog.');
          setBlog(null);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [blogId]);

  if (loading) {
    return (
      <div className='bg-background min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
          <div className='animate-pulse space-y-6'>
            <div className='h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded' />
            <div className='h-8 w-2/3 bg-gray-200 dark:bg-gray-800 rounded' />
            <div className='relative w-full h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl' />
            <div className='space-y-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='h-4 w-full bg-gray-200 dark:bg-gray-800 rounded' />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className='bg-background min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center'>
          <h1 className='text-2xl font-semibold mb-2'>Unable to load blog</h1>
          <p className='text-muted-foreground mb-6'>Something went wrong while fetching this blog.</p>
          <button onClick={() => window.location.reload()} className='px-4 py-2 rounded bg-primary text-primary-foreground'>
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (!blog) {
    return <div className='max-w-4xl mx-auto px-4 py-16'>Blog not found or unavailable.</div>;
  }
  return <BlogCard blog={blog} />;
}
