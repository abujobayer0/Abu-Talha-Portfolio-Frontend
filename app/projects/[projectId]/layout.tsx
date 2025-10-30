import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { getSingleProject } from '@/service/projectService/projectService';
import { TProject } from '@/types';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}

export async function generateMetadata({ params }: { params: { projectId: string } }): Promise<Metadata> {
  const baseUrl = siteConfig?.url?.replace(/\/$/, '') || 'https://www.apexpropdesign.com';
  const canonical = `${baseUrl}/projects/${params.projectId}`;

  let project: TProject | null = null;
  try {
    const res = await getSingleProject(params.projectId);
    project = (res?.data || null) as TProject | null;
  } catch (_) {
    project = null;
  }

  const defaultTitle = `Project | ${siteConfig?.name || 'Abu Talha'}`;
  const defaultDescription = 'Project details, tech stack, and links.';
  const title = project?.title || defaultTitle;
  const description = project?.description?.replace(/<[^>]+>/g, '')?.slice(0, 160) || defaultDescription;
  const images = Array.isArray(project?.images) && project.images.length > 0 ? project.images.slice(0, 1) : [siteConfig?.ogImage];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: images.filter(Boolean).map((url) => ({ url: String(url), width: 1200, height: 630, alt: title })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.filter(Boolean).map((url) => String(url)),
    },
    robots: { index: true, follow: true },
  };
}
