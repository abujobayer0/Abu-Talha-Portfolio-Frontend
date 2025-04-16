'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion, useInView } from 'framer-motion';

import { TExperiences } from '@/types/experiencesTypes';

interface TExperiencesProps {
  experiences: TExperiences[];
}

const MAX_CHAR = 150;

const ClientExperience: React.FC<TExperiencesProps> = ({ experiences }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col py-12 max-w-3xl mx-auto"
    >
      {/* Timeline line */}
      <motion.div
        className="absolute left-12 top-6 bottom-6 w-1 bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-400"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={
          isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
        }
        transition={{ duration: 1.5 }}
        style={{ originY: 0 }}
      />

      {experiences.map((exp, index) => {
        const isExpanded = expanded[exp._id];
        const isLong = exp.description.length > MAX_CHAR;

        return (
          <div key={exp._id} className="relative pl-24 pb-12">
            {/* Timeline logo node */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="absolute left-6 top-6 size-12 z-20"
            >
              <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-full shadow-lg shadow-purple-500/20"></div>
              <div className="absolute inset-0.5 bg-gradient-to-br from-purple-300 to-purple-500 dark:from-purple-500 dark:to-purple-700 rounded-full p-0.5">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1 flex items-center justify-center">
                  <Image
                    alt="logo"
                    className="size-full rounded-full object-cover"
                    height={1000}
                    src={exp.logo}
                    width={1000}
                  />
                </div>
              </div>
            </motion.div>

            {/* Experience card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative group bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl px-6 py-5 border border-purple-100 dark:border-purple-900 shadow-lg overflow-hidden hover:shadow-purple-300/50 transition-all duration-300"
            >
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    'radial-gradient(circle at top left, rgba(168, 85, 247, 0.15), transparent 70%)',
                }}
              />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="text-sm md:text-base font-bold text-purple-800 dark:text-purple-200">
                      {exp.title}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-purple-600 dark:text-purple-300">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-[10px] md:text-xs text-purple-700 dark:text-purple-300">
                    <span className="bg-purple-100/70 dark:bg-purple-900/30 px-3 py-1 rounded-full font-medium">
                      {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                      {exp.endDate
                        ? format(new Date(exp.endDate), 'MMM yyyy')
                        : 'Present'}
                    </span>
                    <span className="italic mt-1">{exp.location}</span>
                  </div>
                </div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: index * 0.3 + 0.2, duration: 1 }}
                  className="h-px w-full bg-gradient-to-r from-purple-400/30 via-purple-500/50 to-purple-400/30 dark:from-purple-600/30 dark:via-purple-500/50 dark:to-purple-600/30"
                />

                {/* Description */}
                <motion.div
                  className="text-xs md:text-sm text-purple-900 dark:text-purple-100 space-y-2"
                  animate={{
                    height: isExpanded ? 'auto' : isLong ? '5rem' : 'auto',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isExpanded || !isLong ? (
                    exp.description.split('\n').map((line, i) => (
                      <motion.p
                        key={i}
                        className="flex items-start gap-2"
                        initial={isExpanded ? { opacity: 0, y: 10 } : {}}
                        animate={isExpanded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.05 }}
                      >
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span>{line}</span>
                      </motion.p>
                    ))
                  ) : (
                    <>
                      {exp.description.slice(0, MAX_CHAR)}...
                      <button
                        className="text-[10px] md:text-xs text-purple-600 hover:text-purple-800 dark:hover:text-purple-300 hover:underline ml-1 font-medium transition-colors"
                        onClick={() => toggleExpand(exp._id)}
                      >
                        See more
                      </button>
                    </>
                  )}
                  {isLong && isExpanded && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[10px] md:text-xs text-purple-600 hover:text-purple-800 dark:hover:text-purple-300 hover:underline mt-1 font-medium transition-colors"
                      onClick={() => toggleExpand(exp._id)}
                    >
                      See less
                    </motion.button>
                  )}
                </motion.div>

                {/* Technologies */}
                <div className="flex flex-wrap items-start gap-2 mt-1">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ delay: 0.5 + techIndex * 0.05 }}
                      className="flex items-center gap-2 border border-purple-200 dark:border-purple-700 rounded-full px-3 py-1 bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-800/50 transition-colors"
                    >
                      <Image
                        alt={tech.name}
                        className="rounded-full size-4 object-cover"
                        height={500}
                        src={tech.icon}
                        width={500}
                      />
                      <span className="text-[10px] md:text-xs text-purple-800 dark:text-purple-200">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientExperience;
