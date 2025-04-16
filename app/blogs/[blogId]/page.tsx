import { BlogCard } from '@/app/(home)/_components/module/blogs/blogCard';
import { Navbar } from '@/app/(home)/_components/ui/navbar';
import { getSingleBlog } from '@/service/blogService/blogService';
import { TBlog } from '@/types';
import { BackHeader } from '@/app/(home)/_components/ui/backHeader';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  const data = await getSingleBlog(params.blogId);
  const blog = data?.data as TBlog;

  return {
    title: blog?.title,
    description: blog?.content?.slice(0, 160),
    openGraph: {
      title: blog?.title,
      description: blog?.content?.slice(0, 160),
      type: 'article',
      url: `https://abutalha.vercel.app/blog/${params.blogId}`,
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
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: { blogId: string };
}) {
  const data = await getSingleBlog(params.blogId);
  const blog = data?.data as TBlog;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <BackHeader />
        <div>
          <BlogCard blog={blog} />
        </div>
      </div>
    </div>
  );
}
