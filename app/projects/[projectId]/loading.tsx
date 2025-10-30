'use client';

export default function LoadingProject() {
  return (
    <div className='pt-4 px-2'>
      <div className='mt-4 max-w-7xl mx-auto px-4 py-8'>
        <div className='animate-pulse space-y-6'>
          <div className='h-8 w-1/2 bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='aspect-[16/9] w-full bg-gray-200 dark:bg-gray-800 rounded-2xl' />
          <div className='h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded' />
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 pt-4'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-28 bg-gray-200 dark:bg-gray-800 rounded-xl' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
