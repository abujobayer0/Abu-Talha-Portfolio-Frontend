import { BlogCard } from '@/app/(home)/_components/module/blogs/blogCard';
import { Navbar } from '@/app/(home)/_components/ui/navbar';
import { getSingleBlog } from '@/service/blogService/blogService';
import { TBlog } from '@/types';
import { BackHeader } from '@/app/(home)/_components/ui/backHeader';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export async function generateMetadata({ params }: { params: { blogId: string } }): Promise<Metadata> {
  const data = await getSingleBlog(params.blogId);
  const blog = data?.data as TBlog;
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const canonical = `${baseUrl}/blogs/${params.blogId}`;

  return {
    title: blog?.title,
    description: blog?.content?.slice(0, 160),
    alternates: {
      canonical,
    },
    openGraph: {
      title: blog?.title,
      description: blog?.content?.slice(0, 160),
      type: 'article',
      url: canonical,
      images: [
        {
          url: blog?.imageUrl,
          width: 1200,
          height: 630,
          alt: blog?.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog?.title,
      description: blog?.content?.slice(0, 160),
      images: [blog?.imageUrl],
    },
    authors: blog?.author?.name ? [{ name: blog.author.name }] : undefined,
    robots: { index: true, follow: true },
    keywords: blog?.title ? blog.title.split(/\s+/).slice(0, 10) : undefined,
  };
}

export default async function BlogDetailsPage({ params }: { params: { blogId: string } }) {
  const data = await getSingleBlog(params.blogId);
  const blog = data?.data as TBlog;
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const canonical = `${baseUrl}/blogs/${params.blogId}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: canonical,
    headline: blog?.title,
    description: blog?.content?.slice(0, 200),
    image: [blog?.imageUrl].filter(Boolean),
    datePublished: blog?.createdAt,
    dateModified: blog?.updatedAt || blog?.createdAt,
    author: blog?.author?.name
      ? {
          '@type': 'Person',
          name: blog.author.name,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.ogImage,
      },
    },
  };

  return (
    <div className='bg-background min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
        <BackHeader />
        <script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div>
          <BlogCard blog={blog} />
        </div>
      </div>
    </div>
  );
}
