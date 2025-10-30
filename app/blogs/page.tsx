import React from 'react';
import type { Metadata } from 'next';

import Blogs from '../(home)/_components/module/blogs';

import { getAllBlogs } from '@/service/blogService/blogService';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Blogs | ${siteConfig.name}`,
  description:
    'Explore technical articles, tutorials, and insights on web development, TypeScript, React, Next.js, and backend engineering by Abu Talha.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/blogs`,
  },
  openGraph: {
    title: `Blogs | ${siteConfig.name}`,
    description:
      'Explore technical articles, tutorials, and insights on web development, TypeScript, React, Next.js, and backend engineering by Abu Talha.',
    url: `${siteConfig.url.replace(/\/$/, '')}/blogs`,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Blogs OG Image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blogs | ${siteConfig.name}`,
    description:
      'Explore technical articles, tutorials, and insights on web development, TypeScript, React, Next.js, and backend engineering by Abu Talha.',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export default async function BlogsPage() {
  let blogs: any[] = [];
  try {
    const data = await getAllBlogs();
    blogs = data?.data || [];
  } catch (e) {
    // Graceful fallback when API is unavailable in production
    blogs = [];
  }

  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Blogs | ${siteConfig.name}`,
    url: `${baseUrl}/blogs`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogs.map((b: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/blogs/${b?._id}`,
        name: b?.title,
      })),
    },
  };

  return (
    <>
      <script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Blogs blogs={blogs} />
    </>
  );
}
