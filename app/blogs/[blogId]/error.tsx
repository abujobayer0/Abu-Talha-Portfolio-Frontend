'use client';

export default function BlogError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='bg-background min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center'>
        <h1 className='text-2xl font-semibold mb-2'>Unable to load blog</h1>
        <p className='text-muted-foreground mb-6'>Something went wrong while fetching this blog. Please try again.</p>
        <button onClick={reset} className='px-4 py-2 rounded bg-primary text-primary-foreground'>
          Retry
        </button>
      </div>
    </div>
  );
}
