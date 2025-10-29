import React, { Suspense } from 'react';

import BlogCard from '../../_components/module/dashboard/blogManagement/blogs';

import { getAllBlogs } from '@/service/blogService/blogService';

export default async function BlogsManagement() {
  const data = await getAllBlogs();
  const blogs = data?.data;

  return (
    <Suspense fallback={<p>loading...</p>}>
      <BlogCard blogs={blogs} />
    </Suspense>
  );
}
