'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { TSkill } from '@/types';

interface TSkillCardProps {
  skill: TSkill;
}

export default function SkillsCard({ skill }: TSkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative group bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-4 border border-purple-100 dark:border-purple-900 shadow-lg overflow-hidden hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
        }}
      />

      <div className="relative z-10 flex items-center justify-center rounded-full p-1 bg-gradient-to-br from-purple-200 to-purple-400/40 shadow-inner shadow-purple-500/20">
        <Image
          alt={skill.name}
          className="size-6 md:size-8 object-cover rounded-full"
          height={48}
          width={48}
          src={skill.icon}
        />
      </div>

      <h3 className="text-sm md:text-base font-medium text-purple-800 dark:text-purple-200 z-10">
        {skill.name}
      </h3>
    </motion.div>
  );
}
