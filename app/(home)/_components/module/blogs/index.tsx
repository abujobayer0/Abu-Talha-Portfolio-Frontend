'use client';

import React from 'react';
import { Avatar } from '@nextui-org/avatar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Title } from '../../ui/title';

import { TBlog } from '@/types';

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
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

interface BlogCardProps {
  blog: TBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
      variants={cardContainerVariants}
      className="bg-gradient-to-br from-[#2e1065]/60 to-black border border-[#4c1d95]/50 backdrop-blur-sm rounded-2xl p-5 shadow-md relative transition-all hover:shadow-purple-900"
    >
      <div className="flex gap-3 items-center mb-4">
        <Avatar size="md" src={blog.author.image} />
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-white text-sm">{blog.author.name}</h3>
          <p className="text-xs text-purple-300">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={blog.imageUrl}
          alt="Blog image"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b0764]/80 to-transparent" />
      </div>

      <div className="mt-4">
        <h4 className="text-white font-semibold line-clamp-2">{'Title'}</h4>
        <div
          className="text-sm text-purple-200 mt-1 leading line-clamp-1 p-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <Link
          href={`/blogs/${blog._id}`}
          className="inline-flex items-center mt-4 text-sm font-medium text-purple-400 hover:text-purple-300 transition"
        >
          Read more →
        </Link>
      </div>
    </motion.div>
  );
};
