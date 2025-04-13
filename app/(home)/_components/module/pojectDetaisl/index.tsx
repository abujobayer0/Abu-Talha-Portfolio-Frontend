// ProjectDetails.tsx

'use client';

import { TProject } from '@/types';
import React, { useState } from 'react';
import Image from 'next/image';
import AnimatedButton from '../../ui/button';
import { AiOutlineEye } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import ThumbnailSlider from './thumbnailSlider ';
import { motion } from 'framer-motion';

export default function ProjectDetails({ project }: { project: TProject }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { images, title, description, technologies, live, github } = project;

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Framer Motion Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-8 p-2 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Side - Main Image */}
      <motion.div
        className="flex flex-col w-full lg:w-1/2"
        variants={imageVariants}
      >
        <motion.div className="w-full h-[400px]">
          <Image
            src={images[currentImageIndex]}
            alt={title}
            className="rounded-lg shadow-lg"
            width={500}
            height={500}
          />
        </motion.div>

        {/* Bottom Image Pagination */}
        <ThumbnailSlider
          images={images}
          currentImageIndex={currentImageIndex}
          handleImageChange={handleImageChange}
        />
      </motion.div>

      {/* Right Side - Project Details */}
      <motion.div
        className="flex flex-col w-full lg:w-1/2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          className="text-2xl font-bold mb-2 text-warning"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-default-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>

        <motion.h2
          className="text-lg font-semibold mb-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Technologies:
        </motion.h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <motion.span
              key={tech._id}
              className="bg-default-200 text-default-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
              animate="animate"
              initial="initial"
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <Image
                src={tech.icon}
                alt="icon"
                width={500}
                height={500}
                className="size-6 rounded-full object-cover"
              />{' '}
              {tech.name}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap gap-3 mt-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ delay: 0.6 }}
        >
          <AnimatedButton
            text="Live"
            bgColor="w-[120px] border-warning flex item-center justify-center bg-transparent"
            textColor="text-default-900"
            href={project.live}
            IconComponent={AiOutlineEye}
            borderColor="border-warning"
            shadowColor="shadow-lg"
          />
          <AnimatedButton
            text="Frontend GitHub"
            bgColor="bg-transparent"
            borderColor="border-default-900"
            textColor="text-default-900"
            href={github.frontend}
            IconComponent={FaGithub}
          />
          <AnimatedButton
            text="Backend GitHub"
            bgColor="bg-transparent"
            borderColor="border-default-900"
            textColor="text-default-900"
            href={github.backend}
            IconComponent={FaGithub}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
