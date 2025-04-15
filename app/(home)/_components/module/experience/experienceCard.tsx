'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { TExperiences } from '@/types/experiencesTypes';

interface TExperiencesProps {
  experiences: TExperiences[];
}

const MAX_CHAR = 150;

const ClientExperience: React.FC<TExperiencesProps> = ({ experiences }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-6">
      {experiences.map((exp, index) => {
        const isExpanded = expanded[exp._id];
        const isLong = exp.description.length > MAX_CHAR;

        return (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: index * 0.1,
            }}
            className="relative group bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl px-5 py-4 border border-purple-100 dark:border-purple-900 shadow-lg overflow-hidden hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
              }}
            />

            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-gradient-to-br from-purple-200 to-purple-400/40 p-1 shadow-inner shadow-purple-500/20">
                    <Image
                      alt="logo"
                      className="size-8 md:size-10 rounded-full object-cover"
                      height={1000}
                      src={exp.logo}
                      width={1000}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs md:text-sm font-medium text-purple-700 dark:text-purple-300">
                      {exp.company}
                    </p>
                    <h3 className="text-[10px] md:text-sm font-medium text-purple-900 dark:text-purple-100">
                      {exp.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end text-[10px] md:text-xs text-purple-700 dark:text-purple-300">
                  <span className="bg-purple-100/70 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                    {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                    {exp.endDate
                      ? format(new Date(exp.endDate), 'MMM yyyy')
                      : 'Present'}
                  </span>
                  <span className="italic">{exp.location}</span>
                </div>
              </div>

              <p className="text-xs text-purple-900 dark:text-purple-100 mt-2">
                {isExpanded || !isLong
                  ? exp.description
                  : `${exp.description.slice(0, MAX_CHAR)}...`}
              </p>

              {isLong && (
                <button
                  className="text-[10px] text-purple-600 hover:underline mt-1"
                  onClick={() => toggleExpand(exp._id)}
                >
                  {isExpanded ? 'See less' : 'See more'}
                </button>
              )}

              <div className="flex flex-wrap items-start gap-2 mt-3">
                {exp.technologies.map((tech) => (
                  <div
                    key={tech._id}
                    className="flex items-center gap-2 border border-purple-300 dark:border-purple-700 rounded px-3 py-1 bg-purple-100/40 dark:bg-purple-900/40"
                  >
                    <Image
                      alt={tech.name}
                      className="rounded-full size-4 object-cover"
                      height={500}
                      src={tech.icon}
                      width={500}
                    />
                    <span className="text-[10px] text-purple-800 dark:text-purple-200">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ClientExperience;
