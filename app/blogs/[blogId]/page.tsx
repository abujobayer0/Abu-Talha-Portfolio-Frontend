import { BlogCard } from '@/app/(home)/_components/module/blogs/blogCard';
import { Navbar } from '@/app/(home)/_components/ui/navbar';
import { Title } from '@/app/(home)/_components/ui/title';
import { getSingleBlog } from '@/service/blogService/blogService';
import { TBlog } from '@/types';
import React from 'react';

export default async function BlogDetailsPage({
  params,
}: {
  params: { blogId: string };
}) {
  const data = await getSingleBlog(params?.blogId);
  const blog = data?.data as TBlog;
  return (
    <div>
      <Navbar />
      <Title title1="Blogs details" title2="Blogs details" />
      <div className="my-5">
        <BlogCard key={blog?._id} blog={blog} />
      </div>
    </div>
  );
}
