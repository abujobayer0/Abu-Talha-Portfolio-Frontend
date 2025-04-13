'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { differenceInYears } from 'date-fns';

import { NumberTicker } from '../../ui/numberTracker';

import { TBlog, TProject, TSkill } from '@/types';

interface TAchievementsProps {
  projects: TProject[];
  skills: TSkill[];
  blogs: TBlog[];
}

const AchievementsSection = ({
  projects,
  skills,
  blogs,
}: TAchievementsProps) => {
  const programmingStartDate = new Date(2022, 8, 1); // September 1, 2022
  const currentYearCount = differenceInYears(new Date(), programmingStartDate);

  const achievementsList = [
    { metric: 'Experience', value: currentYearCount, postfix: '+' },
    { metric: 'Projects', value: projects?.length, postfix: '+' },
    { metric: 'Skills', value: skills?.length, postfix: '+' },
    { metric: 'Blogs', value: blogs?.length, postfix: '+' },
    { metric: 'Awards', value: 3, postfix: '+' },
  ];

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center md:justify-between items-center gap-2 md:gap-3"
      initial={{ opacity: 0, y: 50 }}
      style={{ marginTop: '30px' }}
      transition={{ duration: 0.5 }}
    >
      {achievementsList.map((achievement, index) => (
        <motion.div
          key={index}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center px-4"
          initial={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.h2 className="text-default-800 text-lg md:text-xl font-bold flex flex-row items-baseline">
            <NumberTicker
              className="text-lg md:text-xl font-bold"
              value={achievement.value}
            />
            {achievement.postfix && (
              <span className="ml-1 text-warning">{achievement.postfix}</span>
            )}
          </motion.h2>
          <p className="text-xs md:text-sm">{achievement.metric}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AchievementsSection;
