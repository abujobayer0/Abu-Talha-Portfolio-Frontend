import React from 'react';
import { Metadata } from 'next';

import About from '../_components/module/about';
import { Title } from '../_components/ui/title';

import { getAllAbout } from '@/service/aboutService/aboutService';
import { getAllProjects } from '@/service/projectService/projectService';
import { getAllBlogs } from '@/service/blogService/blogService';
import { getAllSkills } from '@/service/skillsService/skillsService';
import { siteConfig } from '@/config/site';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `About Me | ${siteConfig.name}`,
  description:
    'Learn about Abu Talha Md Jobayer - Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Professional experience in web and mobile development.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/#about`,
  },
  openGraph: {
    title: `About Me | ${siteConfig.name}`,
    description: 'Learn about Abu Talha Md Jobayer - Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js.',
    url: `${siteConfig.url.replace(/\/$/, '')}/#about`,
    type: 'profile',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - About Me`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About Me | ${siteConfig.name}`,
    description: 'Learn about Abu Talha Md Jobayer - Full Stack Developer.',
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default async function AboutPage() {
  const aboutData = await getAllAbout();
  const about = aboutData?.data?.[0];
  const projectsData = await getAllProjects();
  const projects = projectsData?.data;
  const skillsData = await getAllSkills();
  const skills = skillsData?.data;
  const blogsData = await getAllBlogs();
  const blogs = blogsData?.data;

  return (
    <>
      <Title title1='About' title2='About Me' />
      <About about={about} blogs={blogs} projects={projects} skills={skills} />
    </>
  );
}
