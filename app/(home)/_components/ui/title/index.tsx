'use client';

import { motion } from 'framer-motion';

interface TitleProps {
  title1: string;
  title2: string;
}

export function Title({ title1, title2 }: TitleProps) {
  return (
    <div className='relative py-16 md:mb-3 text-center z-20'>
      {/* Background text */}
      <motion.h2
        animate={{ opacity: 0.05 }}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-bold text-default-900 whitespace-nowrap pointer-events-none'
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {title1}
      </motion.h2>

      <div className='flex flex-col items-center -mb-10'>
        {/* Foreground text with animation */}
        <motion.h3
          animate={{ y: 0, opacity: 1 }}
          className='relative text-3xl sm:text-4xl md:text-5xl font-bold text-default-900/60 mb-3'
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {title2}
        </motion.h3>

        {/* Animated underline */}
        <motion.div
          animate={{ width: '120px' }}
          className='h-1 bg-gradient-to-r to-warning-500 from-[#1f2551] mx-auto rounded-full'
          initial={{ width: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </div>
  );
}
