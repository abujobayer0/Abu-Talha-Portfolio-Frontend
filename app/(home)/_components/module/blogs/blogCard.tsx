import React from 'react';
import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';

import { TBlog } from '@/types';

interface BlogCardProps {
  blog: TBlog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <article className="max-w-4xl mx-auto  dark:border-warning-300 rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg hover:border-warning-500 p-6 md:p-10">
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar
          size="lg"
          src={blog.author.image}
          className="ring-2 ring-warning-500"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold text-foreground  dark:text-warning-50">
            {blog.author.name}
          </span>
          <time className="text-sm text-default-500 dark:text-warning-400">
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>

      {/* Blog Image */}
      {blog.imageUrl && (
        <div className="relative w-full h-[300px] md:h-[400px] mb-6 rounded-xl overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt="Blog image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            priority
          />
        </div>
      )}

      {/* Blog Content */}
      <section
        className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-default-800 dark:text-warning-100"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};
