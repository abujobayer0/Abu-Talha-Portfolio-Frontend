import React from 'react';
import { Metadata } from 'next';

import SkillCategories from '../_components/module/skills/skillsCategories';
import { Title } from '../_components/ui/title';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Skills | ${siteConfig.name}`,
  description:
    'Technical skills and expertise of Abu Talha Md Jobayer - React, Next.js, TypeScript, Node.js, Full Stack Development, Web Development, and more.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/#skills`,
  },
  openGraph: {
    title: `Skills | ${siteConfig.name}`,
    description: 'Technical skills and expertise of Abu Talha Md Jobayer - Full Stack Developer.',
    url: `${siteConfig.url.replace(/\/$/, '')}/#skills`,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Skills`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Skills | ${siteConfig.name}`,
    description: 'Technical skills of Abu Talha Md Jobayer.',
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function SkillsPage() {
  return (
    <div>
      <Title title1='Skills' title2='My Skills' />
      <SkillCategories />
    </div>
  );
}
