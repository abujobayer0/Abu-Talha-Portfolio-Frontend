import React from 'react';
import { getAllProjects, getSingleProject } from '@/service/projectService/projectService';
import { TProject } from '@/types';
import ProjectDetails from '@/app/(home)/_components/module/pojectDetaisl';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

interface TDetailsParams {
  params: { projectId: string };
}

// Generate static params for popular projects at build time
export async function generateStaticParams() {
  try {
    const { getAllProjects } = await import('@/service/projectService/projectService');
    const data = await getAllProjects({ limit: 100 });
    const projects = data?.data || [];

    return projects.slice(0, 20).map((project: any) => ({
      projectId: project._id,
    }));
  } catch (error) {
    // Fallback to empty array if API is unavailable at build time
    return [];
  }
}

export default async function ProjectDetailsPage({ params }: TDetailsParams) {
  const projectId = params.projectId;
  const projectData = await getSingleProject(projectId);
  const productsData = await getAllProjects();
  const project = projectData?.data;
  const projects = productsData?.data as TProject[];
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const canonical = `${baseUrl}/projects/${projectId}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project?.title,
    description: project?.description?.replace(/<[^>]+>/g, '').slice(0, 200),
    url: canonical,
    image: (project?.images || []).slice(0, 1),
    datePublished: project?.createdAt,
    dateModified: project?.updatedAt || project?.createdAt,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: 'Abu Talha Md Jobayer',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${baseUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project?.title || 'Project',
        item: canonical,
      },
    ],
  };

  return (
    <div className='pt-4 px-2'>
      <div className='mt-4'>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        <ProjectDetails project={project} projects={projects} currentId={projectId} />
        <div className='w-full h-full'>
          <div className='absolute top-0 left-0 w-full h-[60px] bg-[#9333ea] blur-[150px] transform rotate-45' />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: TDetailsParams): Promise<Metadata> {
  const projectRes = await getSingleProject(params.projectId);
  const project = projectRes?.data as any;
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const canonical = `${baseUrl}/projects/${params.projectId}`;

  return {
    title: project?.title,
    description: project?.description?.replace(/<[^>]+>/g, '').slice(0, 160),
    alternates: { canonical },
    openGraph: {
      title: project?.title,
      description: project?.description?.replace(/<[^>]+>/g, '').slice(0, 160),
      url: canonical,
      type: 'article',
      images: (project?.images || []).slice(0, 1).map((url: string) => ({
        url,
        width: 1200,
        height: 630,
        alt: project?.title,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: project?.title,
      description: project?.description?.replace(/<[^>]+>/g, '').slice(0, 160),
      images: (project?.images || []).slice(0, 1),
    },
    robots: { index: true, follow: true },
    keywords: project?.title ? project.title.split(/\s+/).slice(0, 10) : undefined,
  };
}
