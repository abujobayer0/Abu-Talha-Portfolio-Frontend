'use client';

import React from 'react';

import { NumberTicker } from './numberTracker';

type Stat = {
  label: string;
  prefix?: string;
  value: number;
  suffix?: string;
};

interface StatsRibbonProps {
  stats?: Stat[];
}

export default function StatsRibbon({
  stats = [
    { label: 'Projects Delivered', value: 30, suffix: '+' },
    { label: 'Technologies Used', value: 20, suffix: '+' },
    { label: 'Countries Reached', value: 15, suffix: '+' },
    { label: 'Support', value: 24, suffix: '/7' },
  ],
}: StatsRibbonProps) {
  return (
    <section aria-labelledby='stats-heading' className='w-full'>
      <h2 id='stats-heading' className='sr-only'>
        Key results and availability
      </h2>
      <div className='rounded-3xl border border-purple-500/20 bg-gradient-to-r from-[#5b21b6] via-[#7c3aed] to-[#9333ea] text-white shadow-lg'>
        <ul className='grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10'>
          {stats.map((stat, i) => (
            <li key={stat.label} className='flex flex-col items-center justify-center gap-2 p-6 md:p-8'>
              <p className='text-3xl md:text-4xl font-extrabold tracking-tight'>
                {stat.prefix}
                <NumberTicker value={stat.value} />
                {stat.suffix}
              </p>
              <span className='text-sm md:text-base/relaxed text-white/90'>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
