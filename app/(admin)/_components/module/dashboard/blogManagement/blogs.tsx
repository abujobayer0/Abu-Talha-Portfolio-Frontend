'use client';

import React from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { format } from 'date-fns';
import Image from 'next/image';

import DeleteBlogModal from '../../../modal/deleteBlogModal';
import AddBlogModal from '../../../modal/addBlogModal';
import EditBlogModal from '../../../modal/editBlogModal';

import { TBlog } from '@/types';
import { CommonBlogCard } from '@/app/(home)/_components/module/blogs';

interface TBlogTableProps {
  blogs: TBlog[];
}

export default function BlogCard({ blogs }: TBlogTableProps) {
  return (
    <div className="w-full">
      <div className="flex justify-end mb-5">
        <AddBlogModal />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <CommonBlogCard blog={blog} isEditable key={blog._id} />
        ))}
      </div>
    </div>
  );
}
