import React from 'react';
import type { Metadata } from 'next';

import Contact from '@/app/(home)/_components/module/contact';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    'Hire Abu Talha to build, improve, or scale your product. Share your goals, timeline, and budget — get a response within 24 hours.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/contact`,
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      'Hire Abu Talha to build, improve, or scale your product. Share your goals, timeline, and budget — get a response within 24 hours.',
    url: `${siteConfig.url.replace(/\/$/, '')}/contact`,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Contact OG Image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact | ${siteConfig.name}`,
    description:
      'Hire Abu Talha to build, improve, or scale your product. Share your goals, timeline, and budget — get a response within 24 hours.',
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact | ${siteConfig.name}`,
    url: `${baseUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: baseUrl,
    },
  };

  return (
    <>
      <script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Contact />
    </>
  );
}
