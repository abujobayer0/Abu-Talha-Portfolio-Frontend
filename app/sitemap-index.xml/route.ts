import type { MetadataRoute } from 'next';
import generateSitemap from '@/app/sitemap';

function toIsoDate(value?: string | number | Date): string | null {
  if (!value) return null;
  try {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return null;
    return date.toISOString();
  } catch {
    return null;
  }
}

export async function GET(): Promise<Response> {
  const entries: MetadataRoute.Sitemap = await generateSitemap();

  const urls = entries
    .map((e) => {
      const lastmod = toIsoDate(e.lastModified as any);
      const changefreq = (e as any).changeFrequency as string | undefined;
      const priority = (e as any).priority as number | undefined;
      return [
        '<url>',
        `<loc>${e.url}</loc>`,
        lastmod ? `<lastmod>${lastmod}</lastmod>` : '',
        changefreq ? `<changefreq>${changefreq}</changefreq>` : '',
        typeof priority === 'number' ? `<priority>${priority.toFixed(1)}</priority>` : '',
        '</url>',
      ].join('');
    })
    .join('');

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
  ].join('');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, max-age=3600' },
  });
}
