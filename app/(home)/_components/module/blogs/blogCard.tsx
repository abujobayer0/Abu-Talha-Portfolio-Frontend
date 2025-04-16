'use client';
import React from 'react';
import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { TBlog } from '@/types';

interface BlogCardProps {
  blog: TBlog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  // Function to safely parse HTML content from Quill
  const renderQuillContent = (content: string) => {
    // Sanitize HTML to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(content, {
      ADD_ATTR: ['target'],
      ADD_TAGS: ['iframe'],
      ALLOWED_ATTR: ['href', 'src', 'class', 'style', 'target'],
    });

    // Parse HTML into React components
    return parse(sanitizedContent, {
      trim: true,
      replace: (domNode) => {
        if (
          domNode.type === 'tag' &&
          domNode.name === 'p' &&
          domNode.children?.length === 0
        ) {
          return <br />;
        }
        return undefined;
      },
    });
  };

  return (
    <article className="max-w-4xl mx-auto  rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg hover:border-warning-500 p-6 md:p-10">
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar
          size="lg"
          src={blog.author.image}
          className="ring-2 ring-warning-500"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold text-foreground dark:text-warning-50">
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

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {blog.title}
      </h1>

      {/* Blog Image */}
      {blog.imageUrl && (
        <div className="relative w-full h-[300px] md:h-[400px] mb-6 rounded-xl overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt={`Featured image for ${blog.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover rounded-xl transition-transform hover:scale-105"
            priority
          />
        </div>
      )}

      {/* Blog Content */}
      <section className="quill-content prose prose-lg dark:prose-invert max-w-none text-lg leading-relaxed text-gray-800 dark:text-gray-200 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-warning-600 dark:prose-a:text-warning-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
        {renderQuillContent(blog.content)}
      </section>

      {/* Additional styling for Quill content */}
      <style jsx global>{`
        .quill-content h1 {
          font-size: 2em;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .quill-content h2 {
          font-size: 1.5em;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .quill-content ul,
        .quill-content ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .quill-content ul li {
          list-style-type: disc;
          margin-bottom: 0.5em;
        }
        .quill-content ol li {
          list-style-type: decimal;
          margin-bottom: 0.5em;
        }
        .quill-content blockquote {
          border-left: 4px solid #f5a524;
          padding-left: 1em;
          color: #6b7280;
          font-style: italic;
          margin: 1.5em 0;
        }
        .quill-content pre {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
        }
        .quill-content p {
          margin-bottom: 1em;
        }
        .quill-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
        }
        .quill-content a {
          color: #f59e0b;
          text-decoration: none;
        }
        .quill-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </article>
  );
};
