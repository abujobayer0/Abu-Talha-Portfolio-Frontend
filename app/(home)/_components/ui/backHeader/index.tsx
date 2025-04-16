'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const BackHeader = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 mb-4 cursor-pointer text-warning hover:underline"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-sm font-medium">Back to Blogs</span>
    </div>
  );
};
