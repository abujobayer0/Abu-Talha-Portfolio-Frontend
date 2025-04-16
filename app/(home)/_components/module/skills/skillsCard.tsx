'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TSkill } from '@/types';

interface TSkillCardProps {
  skill: TSkill;
  variant?: 'vertical' | 'horizontal';
}

export default function SkillsCard({
  skill,
  variant = 'vertical',
}: TSkillCardProps) {
  // Level indicator configuration
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'from-blue-400 to-blue-600';
      case 'Intermediate':
        return 'from-purple-400 to-purple-600';
      case 'Advanced':
        return 'from-pink-400 to-pink-600';
      case 'Expert':
        return 'from-amber-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'w-1/4';
      case 'Intermediate':
        return 'w-2/4';
      case 'Advanced':
        return 'w-3/4';
      case 'Expert':
        return 'w-full';
      default:
        return 'w-1/4';
    }
  };

  const isHorizontal = variant === 'horizontal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isHorizontal ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`relative group bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl px-4 py-3 ${
        isHorizontal ? 'flex flex-row items-center' : 'flex flex-col'
      } border border-purple-100 dark:border-purple-900 shadow-lg overflow-hidden hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300`}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
        }}
      />

      {/* Top section with icon and name */}
      <div
        className={`flex items-center gap-4 ${isHorizontal ? 'mr-4 flex-shrink-0' : 'mb-3'}`}
      >
        <div className="relative z-10 flex items-center justify-center rounded-full p-1 bg-gradient-to-br from-purple-200 to-purple-400/40 shadow-inner shadow-purple-500/20">
          <Image
            alt={skill.name}
            className="size-6 md:size-8 object-cover rounded-full"
            height={48}
            width={48}
            src={skill.icon}
          />
        </div>

        {isHorizontal && (
          <h3 className="text-sm md:text-base font-medium text-purple-800 dark:text-purple-200 z-10">
            {skill.name}
          </h3>
        )}
      </div>

      {/* Middle section - only shown in vertical layout */}
      {!isHorizontal && (
        <h3 className="text-sm md:text-base font-medium text-purple-800 dark:text-purple-200 z-10">
          {skill.name}
        </h3>
      )}

      {/* Level indicator section */}
      <div className={`z-10 ${isHorizontal ? 'flex-grow' : 'w-full mt-1'}`}>
        <div className="flex justify-between items-center mb-1">
          <motion.span
            className="text-xs font-medium text-purple-700 dark:text-purple-300 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {skill.level}
          </motion.span>
        </div>

        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ width: getLevelWidth(skill.level) }}
          />
        </div>

        {/* Animated dots */}
        <div className="flex justify-between mt-1">
          {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(
            (level, index) => {
              const isActive =
                ['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(
                  skill.level
                ) >= index;

              return (
                <motion.div
                  key={level}
                  className={`size-1.5 rounded-full ${
                    isActive
                      ? 'bg-purple-500 dark:bg-purple-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                />
              );
            }
          )}
        </div>
      </div>

      {/* Additional info for horizontal variant */}
      {isHorizontal && (
        <div className="flex flex-shrink-0 items-center ml-4 pl-4 border-l border-purple-100/50 dark:border-purple-900/30">
          <motion.div
            className="bg-purple-100/80 dark:bg-purple-900/30 px-3 py-1 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {skill.category}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
