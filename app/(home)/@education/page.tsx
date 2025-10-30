import React from 'react';
import { Metadata } from 'next';

import Education from '../_components/module/education';

import { getAllEducations } from '@/service/educationService/educationService';
import { siteConfig } from '@/config/site';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Education | ${siteConfig.name}`,
  description:
    'Educational background and qualifications of Abu Talha Md Jobayer - Full Stack Developer. Academic achievements and professional certifications.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/#education`,
  },
  openGraph: {
    title: `Education | ${siteConfig.name}`,
    description: 'Educational background and qualifications of Abu Talha Md Jobayer.',
    url: `${siteConfig.url.replace(/\/$/, '')}/#education`,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Education`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Education | ${siteConfig.name}`,
    description: 'Educational background of Abu Talha Md Jobayer.',
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default async function EducationPage() {
  const data = await getAllEducations();
  const educations = data?.data;

  return <Education educations={educations} />;
}
