import React from 'react';
import { Skeleton } from '@nextui-org/skeleton';

export default function SkillsSkeleton() {
  return (
    <div className="bg-default-100/50 backdrop-blur-sm rounded-lg px-3 py-1 md:px-6 md:py-1.5 flex items-center justify-center gap-4 transition transform hover:scale-105 hover:shadow-2xl border border-default-200 z-10">
      {/* Skill Icon */}
      <div className="bg-warningColor rounded-full">
        <Skeleton className="size-4 md:size-6 object-cover rounded-full" />
      </div>

      {/* Skill Name */}
      <div>
        <Skeleton className="w-[70px] md:w-[150px] h-2.5 rounded-lg" />
      </div>
    </div>
  );
}
