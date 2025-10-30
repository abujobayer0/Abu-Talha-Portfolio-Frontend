import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllBlogs } from '@/service/blogService/blogService';
import { getAllProjects } from '@/service/projectService/projectService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  try {
    const [blogsRes, projectsRes] = await Promise.all([
      getAllBlogs({ limit: 5000, sort: '-updatedAt' }),
      getAllProjects({ limit: 5000, sort: '-updatedAt' }),
    ]);

    const blogs = blogsRes?.data || [];
    const projects = projectsRes?.data || [];

    const blogEntries: MetadataRoute.Sitemap = blogs.map((b: any) => {
      const img = b.thumbnail || b.image || b.cover || b.banner;
      const entry: any = {
        url: `${base}/blogs/${b._id}`,
        lastModified: new Date(b.updatedAt || b.createdAt || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
      if (typeof img === 'string') {
        entry.images = [img];
      }
      return entry;
    });

    const projectEntries: MetadataRoute.Sitemap = projects.map((p: any) => {
      const img = p.thumbnail || p.image || p.cover || p.banner;
      const entry: any = {
        url: `${base}/projects/${p._id}`,
        lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
      if (typeof img === 'string') {
        entry.images = [img];
      }
      return entry;
    });

    return [...staticRoutes, ...blogEntries, ...projectEntries];
  } catch {
    // Fallback to static routes if API is unavailable at build time
    return staticRoutes;
  }
}
