import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { getSingleBlog } from '@/service/blogService/blogService';
import { TBlog } from '@/types';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

export async function generateMetadata({ params }: { params: { blogId: string } }): Promise<Metadata> {
  const baseUrl = siteConfig?.url?.replace(/\/$/, '') || 'https://www.apexpropdesign.com';
  const canonical = `${baseUrl}/blogs/${params.blogId}`;

  let blog: TBlog | null = null;
  try {
    const res = await getSingleBlog(params.blogId);
    blog = (res?.data || null) as TBlog | null;
  } catch (_) {
    blog = null;
  }

  const defaultTitle = `Blog Post | ${siteConfig?.name || 'Abu Talha'}`;
  const defaultDescription = 'Read our latest blog post.';
  const title = blog?.title || defaultTitle;
  const description = blog?.content?.replace(/<[^>]+>/g, '')?.slice(0, 160) || defaultDescription;
  const image = blog?.imageUrl || siteConfig?.ogImage;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

// Add JSON-LD for Article and Breadcrumbs for better rich results
export async function generateViewport() {
  return {};
}

export async function BlogJsonLd({ params, children }: { params: { blogId: string }; children: React.ReactNode }) {
  const baseUrl = siteConfig?.url?.replace(/\/$/, '') || 'https://www.apexpropdesign.com';
  const canonical = `${baseUrl}/blogs/${params.blogId}`;
  let blog: TBlog | null = null;
  try {
    const res = await getSingleBlog(params.blogId);
    blog = (res?.data || null) as TBlog | null;
  } catch (_) {
    blog = null;
  }
  const title = blog?.title || `Blog Post | ${siteConfig?.name || 'Abu Talha'}`;
  const description = blog?.content?.replace(/<[^>]+>/g, '')?.slice(0, 160) || 'Read our latest blog post.';
  const image = blog?.imageUrl || siteConfig?.ogImage;
  const published = blog?.createdAt || new Date().toISOString();
  const modified = blog?.updatedAt || published;

  return (
    <>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description,
            image: [image],
            author: { '@type': 'Person', name: 'Abu Talha Md Jobayer' },
            publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: siteConfig.ogImage } },
            datePublished: published,
            dateModified: modified,
            mainEntityOfPage: canonical,
          }),
        }}
      />
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
              { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${baseUrl}/blogs` },
              { '@type': 'ListItem', position: 3, name: title, item: canonical },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
