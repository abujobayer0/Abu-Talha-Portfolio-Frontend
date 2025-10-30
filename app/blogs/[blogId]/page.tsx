import { BlogCard } from '@/app/(home)/_components/module/blogs/blogCard';
import { Navbar } from '@/app/(home)/_components/ui/navbar';
import { getSingleBlog } from '@/service/blogService/blogService';
import { TBlog } from '@/types';
import { BackHeader } from '@/app/(home)/_components/ui/backHeader';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

// Generate static params for recent blogs at build time
export async function generateStaticParams() {
  try {
    const { getAllBlogs } = await import('@/service/blogService/blogService');
    const data = await getAllBlogs({ limit: 100 });
    const blogs = data?.data || [];

    // Safe guard against invalid data structure
    if (!Array.isArray(blogs)) {
      return [];
    }

    return blogs
      .filter((blog: any) => blog && blog._id) // Filter out invalid entries
      .slice(0, 20)
      .map((blog: any) => ({
        blogId: blog._id,
      }));
  } catch (error) {
    console.error('Error in generateStaticParams for blogs:', error);
    // Fallback to empty array if API is unavailable at build time
    return [];
  }
}

export async function generateMetadata({ params }: { params: { blogId: string } }): Promise<Metadata> {
  let blog: TBlog | null = null;
  try {
    const data = await getSingleBlog(params.blogId);
    blog = data?.data as TBlog;
  } catch (error) {
    // Graceful fallback when API is unavailable
    blog = null;
  }

  const baseUrl = siteConfig?.url?.replace(/\/$/, '') || 'https://www.apexpropdesign.com';
  const canonical = `${baseUrl}/blogs/${params.blogId}`;

  const defaultTitle = `Blog Post | ${siteConfig?.name || 'Abu Talha'}`;
  const defaultDescription = 'Read our latest blog post.';

  return {
    title: blog?.title || defaultTitle,
    description: blog?.content?.replace(/<[^>]+>/g, '')?.slice(0, 160) || defaultDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: blog?.title || defaultTitle,
      description: blog?.content?.replace(/<[^>]+>/g, '')?.slice(0, 160) || defaultDescription,
      type: 'article',
      url: canonical,
      images: blog?.imageUrl
        ? [
            {
              url: blog?.imageUrl,
              width: 1200,
              height: 630,
              alt: blog?.title || 'Blog Post',
            },
          ]
        : [
            {
              url:
                siteConfig?.ogImage ||
                'https://i.ibb.co.com/wF9NWgf8/Building-websites-at-affordable-prices-is-a-valuable-service-that-caters-to-small-businesses-startup.png',
              width: 1200,
              height: 630,
              alt: defaultTitle,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog?.title || defaultTitle,
      description: blog?.content?.replace(/<[^>]+>/g, '')?.slice(0, 160) || defaultDescription,
      images: blog?.imageUrl
        ? [blog.imageUrl]
        : [
            siteConfig?.ogImage ||
              'https://i.ibb.co.com/wF9NWgf8/Building-websites-at-affordable-prices-is-a-valuable-service-that-caters-to-small-businesses-startup.png',
          ],
    },
    authors: blog?.author?.name ? [{ name: blog.author.name }] : undefined,
    robots: { index: true, follow: true },
    keywords: blog?.title ? blog?.title?.split(/\s+/).slice(0, 10) : undefined,
  };
}

export default async function BlogDetailsPage({ params }: { params: { blogId: string } }) {
  let blog: TBlog | null = null;
  try {
    const data = await getSingleBlog(params.blogId);
    blog = data?.data as TBlog;
  } catch (error) {
    // Graceful fallback when API is unavailable in production
    blog = null;
  }

  const baseUrl = siteConfig?.url?.replace(/\/$/, '') || 'https://www.apexpropdesign.com';
  const canonical = `${baseUrl}/blogs/${params.blogId}`;

  const jsonLd = blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical,
        },
        headline: blog?.title,
        description: blog?.content?.replace(/<[^>]+>/g, '')?.slice(0, 200),
        image: [blog?.imageUrl].filter(Boolean),
        datePublished: blog?.createdAt,
        dateModified: blog?.updatedAt || blog?.createdAt,
        author: blog?.author?.name
          ? {
              '@type': 'Person',
              name: blog.author.name,
              url: siteConfig.url,
            }
          : {
              '@type': 'Person',
              name: 'Abu Talha Md Jobayer',
              url: siteConfig?.url || 'https://www.apexpropdesign.com',
            },
        publisher: {
          '@type': 'Organization',
          name: siteConfig?.name || 'Abu Talha',
          url: siteConfig?.url || 'https://www.apexpropdesign.com',
          logo: {
            '@type': 'ImageObject',
            url:
              siteConfig?.ogImage ||
              'https://i.ibb.co.com/wF9NWgf8/Building-websites-at-affordable-prices-is-a-valuable-service-that-caters-to-small-businesses-startup.png',
            width: 1200,
            height: 630,
          },
        },
        articleSection: 'Technology',
        keywords: blog?.title ? blog.title.split(/\s+/)?.join(', ') : 'Web Development, Technology',
        inLanguage: 'en-US',
      }
    : null;

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
        name: 'Blogs',
        item: `${baseUrl}/blogs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog?.title || 'Blog Post',
        item: canonical,
      },
    ],
  };

  return (
    <div className='bg-background min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
        <BackHeader />
        {jsonLd && (
          <script type='application/ld+json' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div>{blog ? <BlogCard blog={blog} /> : <div>Blog not found or unavailable.</div>}</div>
      </div>
    </div>
  );
}
