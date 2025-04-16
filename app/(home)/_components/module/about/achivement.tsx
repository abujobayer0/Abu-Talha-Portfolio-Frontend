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
    {
      metric: 'Experience',
      value: currentYearCount,
      postfix: '+',
      icon: 'clock',
    },
    { metric: 'Projects', value: projects?.length, postfix: '+', icon: 'code' },
    { metric: 'Skills', value: skills?.length, postfix: '+', icon: 'tools' },
    { metric: 'Blogs', value: blogs?.length, postfix: '+', icon: 'document' },
    { metric: 'Awards', value: 3, postfix: '+', icon: 'trophy' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'code':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        );
      case 'tools':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case 'document':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case 'trophy':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {achievementsList.map((achievement, index) => (
        <motion.div
          key={achievement.metric}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 rounded-xl shadow hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-purple-600 dark:text-purple-400 mb-2">
              {getIcon(achievement.icon)}
            </div>
            <div className="flex items-center justify-center">
              <NumberTicker value={achievement.value} />
              {achievement.postfix && (
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  {achievement.postfix}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">
              {achievement.metric}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementsSection;
