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
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};

export default function Projects({ projects }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <div className="py-16 bg-black">
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6"
      >
        <AnimatePresence>
          {projects?.map((project, index) => (
            <motion.div
              key={project._id}
              custom={index}
              animate={controls}
              variants={itemVariants}
              exit="exit"
              whileHover={{ scale: 1.015 }}
              onMouseEnter={() => setHoveredProject(project._id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative"
            >
              <div className="group h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#9333ea]/15 to-black shadow-md hover:shadow-[#9333ea]/40 transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    fill
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={
                      project?.images[0] ||
                      '/placeholder.svg?height=400&width=600'
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3b0764]/85 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech._id}
                        className="rounded-full bg-[#c4b5fd]/10 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-[#f5f3ff] border border-[#9333ea]/30 hover:bg-[#9333ea]/20 transition-all"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-[#c4b5fd]/10 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-[#f5f3ff] border border-[#9333ea]/30">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project content */}
                <div className="p-5">
                  <h3 className="font-bold text-[#f5f3ff] text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#c4b5fd] mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-3">
                      {project.live && (
                        <Link
                          className="flex items-center justify-center size-9 rounded-full bg-[#7e22ce]/60 text-white hover:bg-[#9333ea] transition"
                          href={project.live}
                          target="_blank"
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                      )}
                    </div>
                    <Link
                      className="flex items-center text-[#ede9fe] font-medium hover:text-white text-sm transition"
                      href={`/project/${project._id}`}
                    >
                      View Details
                      <ChevronRight className="ml-1 size-4" />
                    </Link>
                  </div>
                </div>

                {/* Glow border */}
                <AnimatePresence>
                  {hoveredProject === project._id && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="glow-border"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#9333ea" />
                            <stop offset="100%" stopColor="#3b0764" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur
                              stdDeviation="4"
                              result="coloredBlur"
                            />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <rect
                          x="1"
                          y="1"
                          width="99%"
                          height="99%"
                          rx="16"
                          stroke="url(#glow-border)"
                          strokeWidth="1.5"
                          fill="none"
                          filter="url(#glow)"
                        />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
