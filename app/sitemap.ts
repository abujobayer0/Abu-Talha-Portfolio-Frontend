import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllBlogs } from '@/service/blogService/blogService';
import { getAllProjects } from '@/service/projectService/projectService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/blogs`, lastModified: new Date() },
  ];

  try {
    const [blogsRes, projectsRes] = await Promise.all([
      getAllBlogs({ limit: 1000, sort: '-updatedAt' }),
      getAllProjects({ limit: 1000, sort: '-updatedAt' }),
    ]);

    const blogs = blogsRes?.data || [];
    const projects = projectsRes?.data || [];

    const blogEntries: MetadataRoute.Sitemap = blogs.map((b: any) => ({
      url: `${base}/blogs/${b._id}`,
      lastModified: new Date(b.updatedAt || b.createdAt || Date.now()),
    }));

    const projectEntries: MetadataRoute.Sitemap = projects.map((p: any) => ({
      url: `${base}/projects/${p._id}`,
      lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
    }));

    return [...staticRoutes, ...blogEntries, ...projectEntries];
  } catch {
    // Fallback to static routes if API is unavailable at build time
    return staticRoutes;
  }
}
