'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ChevronRight } from 'lucide-react';

import { TProject } from '@/types';

interface ProjectsProps {
  projects: TProject[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeInOut',
    },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export default function Projects({ projects }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <div className='py-12 relative'>
      <div ref={ref} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6'>
        <AnimatePresence>
          {projects?.map((project, index) => (
            <motion.div
              key={project._id}
              custom={index}
              animate={controls}
              variants={itemVariants}
              exit='exit'
              onMouseEnter={() => setHoveredProject(project._id)}
              onMouseLeave={() => setHoveredProject(null)}
              className='relative cursor-pointer'
            >
              <div className='group relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300'>
                {/* Animated glow background on hover */}
                <motion.div
                  className='absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
                  }}
                />

                {/* Image */}
                <div className='relative h-60 w-full overflow-hidden'>
                  <Image
                    fill
                    alt={project.title}
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    src={project?.images[0] || '/placeholder.svg?height=400&width=600'}
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-900/85 to-transparent transition-opacity duration-300" /> */}

                  <div className='absolute top-4 left-4 flex flex-wrap gap-2'>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech._id}
                        className='rounded-full bg-purple-100/50 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-purple-800 border border-purple-400/30 hover:bg-purple-400/20 transition-all'
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className='rounded-full bg-purple-100/10 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-purple-800 border border-purple-400/30'>
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project content */}
                <div className='p-5 z-10 relative'>
                  <h3 className='font-bold text-purple-800 dark:text-purple-200 text-lg mb-2  line-clamp-1'>{project.title}</h3>
                  <div
                    className='text-sm text-gray-700 dark:text-purple-300 mt-2 line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  <div className='flex items-center justify-between mt-4'>
                    <div className='flex gap-3'>
                      {project.live && (
                        <Link
                          className='flex items-center justify-center size-9 rounded-full bg-gradient-to-br from-purple-200 to-purple-400/40 shadow-inner shadow-purple-500/20 text-purple-800 dark:text-purple-200 hover:bg-purple-400/60 transition'
                          href={project.live}
                          target='_blank'
                        >
                          <ExternalLink className='size-4' />
                        </Link>
                      )}
                    </div>
                    <Link
                      className='flex items-center text-purple-800 dark:text-purple-200 font-medium hover:text-purple-600 dark:hover:text-white text-sm transition'
                      href={`/projects/${project._id}`}
                    >
                      View Case Study
                      <ChevronRight className='ml-1 size-4' />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
