import React from 'react';
import { Metadata } from 'next';
import Landing from './_components/landing';
import { siteConfig } from '@/config/site';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Abu Talha Md Jobayer',
      jobTitle: 'Full Stack Developer',
      url: baseUrl,
      image: siteConfig.ogImage,
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter, siteConfig.links.facebook].filter(Boolean),
    },
  };

  return (
    <>
      <script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div>
        <Landing />
      </div>
    </>
  );
}
