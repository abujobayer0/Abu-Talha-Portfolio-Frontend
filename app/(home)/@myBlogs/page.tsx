import React from 'react';

import Blogs from '../_components/module/blogs';
import PaginationControls from '../_components/ui/paginationControl';
import Link from 'next/link';

import { getAllBlogs } from '@/service/blogService/blogService';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

interface BlogsSectionProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsSectionProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;

  const data = await getAllBlogs({
    limit,
    page: currentPage,
    sort: '-createdAt',
  });

  const blogs = data?.data || [];
  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div>
      <Blogs blogs={blogs} />
      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      <div className='flex justify-center'>
        <Link
          href='/blogs'
          className='inline-flex items-center px-5 py-2 rounded-full border border-warning-500 text-warning hover:bg-warning-500/10 transition-colors'
        >
          Browse all blogs
        </Link>
      </div>
    </div>
  );
}
