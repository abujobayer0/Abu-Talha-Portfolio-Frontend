import React from 'react';
import { Metadata } from 'next';

import Experience from '../_components/module/experience';

import { getAllExperiences } from '@/service/experienceService/experienceService';
import { siteConfig } from '@/config/site';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Experience | ${siteConfig.name}`,
  description:
    'Professional experience and career timeline of Abu Talha Md Jobayer - Full Stack Developer. Work history, projects, and technical achievements.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/#experience`,
  },
  openGraph: {
    title: `Experience | ${siteConfig.name}`,
    description: 'Professional experience and career timeline of Abu Talha Md Jobayer.',
    url: `${siteConfig.url.replace(/\/$/, '')}/#experience`,
    type: 'profile',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Experience`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Experience | ${siteConfig.name}`,
    description: 'Professional experience of Abu Talha Md Jobayer.',
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default async function ExperiencePage() {
  const experienceData = await getAllExperiences();
  const experiences = experienceData?.data;

  return (
    <>
      <Experience experiences={experiences} />
    </>
  );
}
