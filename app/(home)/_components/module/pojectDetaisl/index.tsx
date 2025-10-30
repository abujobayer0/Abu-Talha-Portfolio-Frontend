'use client';

import { TProject } from '@/types';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimatedButton from '../../ui/button';
import { AiOutlineEye } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { findRelatedProjects } from '@/utils/findRelatedProjects';

export default function ProjectDetails({ project, projects, currentId }: { project: TProject; projects: TProject[]; currentId: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray((project as any)?.images) ? (project as any).images : [];
  const title = (project as any)?.title ?? 'Project';
  const description = (project as any)?.description ?? '';
  const technologies = Array.isArray((project as any)?.technologies) ? (project as any).technologies : [];
  const live = (project as any)?.live as string | undefined;
  const github = (project as any)?.github || {};
  const relatedProjects = findRelatedProjects(projects || [], currentId);
  // Auto-advance image carousel
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Function to safely parse HTML content
  const renderHtmlContent = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ADD_ATTR: ['target'],
      ADD_TAGS: ['iframe'],
      ALLOWED_ATTR: ['href', 'src', 'class', 'style', 'target'],
    });

    return parse(sanitizedContent, {
      trim: true,
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'p' && domNode.children?.length === 0) {
          return <br />;
        }
        return undefined;
      },
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  // Image navigation
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    if (!images.length) return;
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!images.length) return;
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <motion.div initial='hidden' animate='visible' variants={containerVariants} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content Area (Left and Middle) */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Image Gallery - Full Width at Top */}
          <motion.div className='relative aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-xl' variants={itemVariants}>
            {/* Main Image with Animation */}
            <div className='relative w-full h-full'>
              {images.length > 0 ? (
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentImageIndex}
                    custom={direction}
                    variants={imageVariants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    className='absolute inset-0'
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${title} - image ${currentImageIndex + 1}`}
                      fill
                      priority
                      sizes='(max-width: 1024px) 100vw, 66vw'
                      className='object-cover'
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className='absolute inset-0 flex items-center justify-center text-white/70'>No images available</div>
              )}

              {/* Live Link Button - Top Right Corner */}
              {live && (
                <motion.a
                  href={live}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className='text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded-full'>LIVE</span>
                  <FiExternalLink className='w-4 h-4' />
                  <span className='text-sm font-medium hidden sm:inline'>Visit Site</span>
                </motion.a>
              )}

              {/* Image Navigation Controls */}
              <button
                onClick={prevImage}
                className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-all z-10'
                aria-label='Previous image'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m15 18-6-6 6-6' />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-all z-10'
                aria-label='Next image'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m9 18 6-6-6-6' />
                </svg>
              </button>

              {/* Image Pagination Indicator */}
              <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10'>
                {images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-warning w-6' : 'bg-white/60'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project Title and Technologies */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <div className='flex flex-wrap justify-between items-center gap-4'>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>{title}</h1>

              <div className='flex flex-wrap gap-3'>
                {github.frontend && (
                  <AnimatedButton
                    text='GitHub'
                    bgColor='bg-gray-800 dark:bg-gray-700'
                    textColor='text-white'
                    href={github.frontend}
                    IconComponent={FaGithub}
                    shadowColor='shadow-md'
                  />
                )}
                {github.backend && (
                  <AnimatedButton
                    text='Backend Repository'
                    bgColor='bg-gray-800 dark:bg-gray-700'
                    textColor='text-white'
                    href={github.backend}
                    IconComponent={FaGithub}
                    shadowColor='shadow-md'
                  />
                )}
              </div>
            </div>

            <div className='flex flex-wrap gap-2'>
              {technologies.map((tech: { _id: string; icon: string; name: string }) => (
                <motion.span
                  key={tech._id}
                  className='bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-gray-200 dark:border-gray-700'
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image src={tech.icon} alt={tech.name} width={18} height={18} className='rounded-full object-cover' />
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Project Description */}
          <motion.div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8' variants={itemVariants}>
            <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>Project Overview</h2>

            <div className='rich-content prose prose-lg dark:prose-invert max-w-none'>
              {typeof description === 'string' && description.includes('<') ? (
                renderHtmlContent(description)
              ) : (
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>{description}</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Projects Sidebar (Right) */}
        <motion.div className='lg:col-span-1 space-y-6' variants={itemVariants}>
          <div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg p-6'>
            <div className='flex justify-between '>
              <h2 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>More Projects</h2>
              <Link href={'/projects'}>
                <p className='hover:underline text-gray-500 cursor-pointer'>view all</p>
              </Link>
            </div>

            <div className='space-y-4'>
              {relatedProjects.length > 0 ? (
                relatedProjects.map((relatedProject) => (
                  <Link href={`/projects/${relatedProject._id}`} key={relatedProject._id} className='block'>
                    <motion.div
                      className='group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-all'
                      whileHover={{ y: -5 }}
                    >
                      <div className='aspect-video relative'>
                        {relatedProject.images && relatedProject.images[0] ? (
                          <Image
                            src={relatedProject.images[0]}
                            alt={relatedProject.title}
                            fill
                            sizes='(max-width: 1024px) 100vw, 33vw'
                            className='object-cover group-hover:scale-105 transition-transform duration-500'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center text-gray-500'>No image</div>
                        )}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity' />
                      </div>
                      <div className='absolute bottom-0 left-0 right-0 p-4'>
                        <h3 className='text-white font-semibold line-clamp-2'>{relatedProject.title}</h3>
                      </div>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <div className='py-8 flex flex-col items-center justify-center text-center'>
                  <div className='rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-3 mb-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-gray-500'
                    >
                      <rect width='7' height='7' x='3' y='3' rx='1' />
                      <rect width='7' height='7' x='14' y='3' rx='1' />
                      <rect width='7' height='7' x='14' y='14' rx='1' />
                      <rect width='7' height='7' x='3' y='14' rx='1' />
                    </svg>
                  </div>
                  <p className='text-gray-500 dark:text-gray-400'>No related projects available</p>
                </div>
              )}
            </div>
          </div>

          {/* Technology Breakdown */}
          <div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg p-6'>
            <h2 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>Technology Stack</h2>

            <div className='space-y-3'>
              {technologies.map((tech: { _id: string; icon: string; name: string }) => (
                <div key={tech._id} className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 p-1.5 flex items-center justify-center'>
                    <Image src={tech.icon} alt={tech.name} width={24} height={24} className='rounded-full object-cover' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900 dark:text-white'>{tech.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* CSS for Rich Content */}
      <style jsx global>{`
        .rich-content h1 {
          font-size: 1.875em;
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: 700;
          color: #1f2937;
        }
        .dark .rich-content h1 {
          color: #f5f5f5;
        }
        .rich-content h2 {
          font-size: 1.5em;
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: 600;
          color: #1f2937;
        }
        .dark .rich-content h2 {
          color: #f5f5f5;
        }
        .rich-content ul,
        .rich-content ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .rich-content ul li {
          list-style-type: disc;
          margin-bottom: 0.5em;
        }
        .rich-content ol li {
          list-style-type: decimal;
          margin-bottom: 0.5em;
        }
        .rich-content blockquote {
          border-left: 4px solid #f59e0b;
          padding-left: 1em;
          color: #6b7280;
          font-style: italic;
          margin: 1.5em 0;
        }
        .dark .rich-content blockquote {
          color: #9ca3af;
        }
        .rich-content pre {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .rich-content p {
          margin-bottom: 1em;
          line-height: 1.7;
        }
        .rich-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
          margin: 1.5em 0;
        }
        .rich-content a {
          color: #f59e0b;
          text-decoration: none;
          font-weight: 500;
        }
        .rich-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
