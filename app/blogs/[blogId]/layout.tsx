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
          url:
            image ||
            'https://i.ibb.co.com/wF9NWgf8/Building-websites-at-affordable-prices-is-a-valuable-service-that-caters-to-small-businesses-startup.png',
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
      images: [
        image ||
          'https://i.ibb.co.com/wF9NWgf8/Building-websites-at-affordable-prices-is-a-valuable-service-that-caters-to-small-businesses-startup.png',
      ],
    },
    robots: { index: true, follow: true },
  };
}
