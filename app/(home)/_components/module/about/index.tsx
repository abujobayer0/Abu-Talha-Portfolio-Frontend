'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedButton from '../../ui/button';
import AchievementsSection from './achivement';
import { TAbout, TBlog, TProject, TSkill } from '@/types';
import { useGetLink } from '@/hooks/links.hook';
import GridBackgrounds from '@/components/common/backgrounds/grid';

interface TAboutProps {
  about: TAbout;
  projects: TProject[];
  skills: TSkill[];
  blogs: TBlog[];
}

export default function About({ about, projects, skills, blogs }: TAboutProps) {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');

  return (
    <section className="w-full py-16 ">
      <div className="container mx-auto px-4 relative">
        <GridBackgrounds />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl shadow-xl">
              {about.image && (
                <Image
                  src={about.image}
                  alt={about.title || 'Profile Image'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl z-0"></div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">{about.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Address: {about.address + ', ' + about.country}</span>
            </p>
            <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {about.description}
              </p>
            </div>

            {/* Achievements Section */}
            <div className="mt-8">
              <AchievementsSection
                projects={projects}
                skills={skills}
                blogs={blogs}
              />
            </div>

            {/* Download CV Button */}
            <div className="mt-8">
              <AnimatedButton
                bgColor="bg-transparent"
                borderColor="border-warning-500 my-5"
                href={
                  link?.data?.resume ||
                  'https://drive.google.com/file/d/15OqqkOMwSooI_iuQhrb7bCAQLEGug-sN/view?usp=drive_link'
                }
                target="_blank"
                text="View Resume"
                textColor="text-warning"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
