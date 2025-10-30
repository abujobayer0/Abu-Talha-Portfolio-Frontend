'use client';

export default function LoadingBlog() {
  return (
    <div className='bg-background min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
        <div className='animate-pulse space-y-6'>
          <div className='h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='h-8 w-2/3 bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='relative w-full h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl' />
          <div className='space-y-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-4 w-full bg-gray-200 dark:bg-gray-800 rounded' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
