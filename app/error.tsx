'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md border border-purple-500 rounded-lg bg-black/50 backdrop-blur-md overflow-hidden">
        <div className="flex flex-col items-center text-center gap-4 p-8">
          <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center">
            <span className="text-purple-300 text-3xl font-bold">!</span>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Something went wrong
          </h2>

          <p className="text-purple-200 text-sm">
            We encountered an unexpected error while processing your request.
          </p>

          <div className="w-full mt-4 bg-purple-900/30 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full w-1/3"></div>
          </div>

          <div className="mt-2 p-3 bg-purple-900/40 rounded-md text-purple-300 text-xs font-mono w-full overflow-auto">
            <code>{error.message || 'Unknown error occurred'}</code>
          </div>
        </div>

        <div className="flex justify-center pb-6">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-lg transition-colors"
          >
            <RefreshCw size={18} />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
