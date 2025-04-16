import { BlogCard } from '@/app/(home)/_components/module/blogs/blogCard';
import { Navbar } from '@/app/(home)/_components/ui/navbar';
import { Title } from '@/app/(home)/_components/ui/title';
import { getSingleBlog } from '@/service/blogService/blogService';
import { TBlog } from '@/types';
import { BackHeader } from '@/app/(home)/_components/ui/backHeader'; // create this client component

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
