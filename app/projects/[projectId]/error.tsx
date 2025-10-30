'use client';

export default function ProjectError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='pt-4 px-2'>
      <div className='mt-4 max-w-3xl mx-auto px-4 py-16 text-center'>
        <h1 className='text-2xl font-semibold mb-2'>Unable to load project</h1>
        <p className='text-muted-foreground mb-6'>Something went wrong while fetching this project. Please try again.</p>
        <button onClick={reset} className='px-4 py-2 rounded bg-primary text-primary-foreground'>
          Retry
        </button>
      </div>
    </div>
  );
}
