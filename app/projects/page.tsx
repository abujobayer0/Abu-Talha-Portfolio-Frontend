import type { Metadata } from 'next';

import Project from '@/app/(home)/_components/module/projects';
import { Title } from '@/app/(home)/_components/ui/title';
import PaginationControls from '@/app/(home)/_components/ui/paginationControl';

import { getAllProjects } from '@/service/projectService/projectService';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name}`,
  description:
    'Browse production-grade projects with performance, DX, and business impact in focus. Case studies across React, Next.js, Node.js, and TypeScript.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/projects`,
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      'Browse production-grade projects with performance, DX, and business impact in focus. Case studies across React, Next.js, Node.js, and TypeScript.',
    url: `${siteConfig.url.replace(/\/$/, '')}/projects`,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Projects OG Image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Projects | ${siteConfig.name}`,
    description:
      'Browse production-grade projects with performance, DX, and business impact in focus. Case studies across React, Next.js, Node.js, and TypeScript.',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Enable ISR: revalidate every hour
export const revalidate = 3600;

interface ProjectsPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 50;

  let data: any = undefined;
  try {
    data = await getAllProjects({
      limit,
      page: currentPage,
      sort: '-updatedAt',
    });
  } catch (e) {
    // Graceful fallback when API is unavailable in production
    data = { data: [], meta: { total: 0 } };
  }

  const projects = data?.data || [];
  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Projects | ${siteConfig.name}`,
    url: `${baseUrl}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (projects || []).map((p: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/projects/${p?._id}`,
        name: p?.title || 'Project',
      })),
    },
  };

  return (
    <div>
      <script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Title title1='Projects' title2='My Projects' />
      <Project projects={projects} />
      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
