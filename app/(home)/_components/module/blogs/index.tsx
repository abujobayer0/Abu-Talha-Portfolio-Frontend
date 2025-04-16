'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Title } from '../../ui/title';

import { TBlog } from '@/types';
import EditBlogModal from '@/app/(admin)/_components/modal/editBlogModal';
import DeleteBlogModal from '@/app/(admin)/_components/modal/deleteBlogModal';

interface TBlogsProps {
  blogs: TBlog[];
}

const cardContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Blogs({ blogs }: TBlogsProps) {
  return (
    <div className="py-12">
      <Title title1="Blogs" title2="My Blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        {blogs.map((blog, index) => (
          <CommonBlogCard key={blog._id} index={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}

interface BlogCardProps {
  blog: TBlog;
  index?: number;
  isEditable?: boolean;
}
export const CommonBlogCard = ({
  blog,
  isEditable,
  index = 0,
}: BlogCardProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true }}
      variants={cardContainerVariants}
      className="relative cursor-pointer"
    >
      <div className="group relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300">
        {/* Animated glow background on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
          }}
        />

        <div className="p-5">
          {/* Author info */}
          <div className="flex gap-3 items-center mb-4 relative z-10">
            <div className="relative size-10 rounded-full bg-gradient-to-br from-purple-200 to-purple-400/40 shadow-inner shadow-purple-500/20 overflow-hidden">
              <Image
                src={blog.author.image}
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start">
              <h3 className="font-bold text-purple-800 dark:text-purple-200 text-sm">
                {blog.author.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-purple-300">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            {isEditable && (
              <div
                className="flex space-x-3"
                onClick={(e) => e.stopPropagation()}
              >
                <EditBlogModal blog={blog} />
                <DeleteBlogModal blog={blog} />
              </div>
            )}
          </div>

          {/* Blog image */}
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={blog.imageUrl}
              alt="Blog image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Blog content */}
          <div className="mt-4 relative z-10">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 text-lg line-clamp-2">
              {blog?.title || 'Title'}
            </h4>
            <div
              className="text-sm text-gray-700 dark:text-purple-300 mt-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <Link
              href={`/blogs/${blog._id}`}
              className="flex items-center text-purple-800 dark:text-purple-200 font-medium hover:text-purple-600 dark:hover:text-white text-sm transition mt-4"
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
