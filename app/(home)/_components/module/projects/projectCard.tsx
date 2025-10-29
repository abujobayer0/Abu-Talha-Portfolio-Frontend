import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { TbFileDescription } from 'react-icons/tb';
import Link from 'next/link';

import AnimatedButton from '../../ui/button';

import { TProject } from '@/types';

const cardContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger animation of buttons
    },
  },
};

const buttonVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function ProjectCard({ project }: { project: TProject }) {
  return (
    <motion.div
      animate='visible'
      className='bg-default-50 p-5 border border-default-100 relative rounded-md'
      initial='hidden'
      transition={{ duration: 0.3 }}
      variants={cardContainerVariants}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
    >
      {/* Project Image */}
      <div className='mb-10 relative overflow-hidden rounded'>
        <Link href={`/projects/${project._id}`}>
          <Image
            alt={project?.title}
            className='w-full md:h-[200px] object-cover rounded transition-transform duration-300'
            height={1000}
            src={project?.images[0]}
            width={1000}
          />
          {/* Hover effect for the image */}
          <motion.div
            className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300'
            initial='hidden'
            whileHover={{ opacity: 1 }}
          >
            <h2 className='text-white font-bold text-lg px-2 text-center'>{project.title}</h2>
          </motion.div>
        </Link>
      </div>

      {/* Technology Badges */}
      <div className='flex flex-wrap justify-between gap-2 mb-4'>
        {project.technologies.slice(0, 6).map((tech, index) => (
          <div key={index} className=''>
            <Image alt='icon' className='size-8 object-cover' height={1000} src={tech.icon} width={1000} />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <motion.div animate='visible' className='flex items-center justify-between gap-3' initial='hidden' variants={buttonContainerVariants}>
        <motion.div variants={buttonVariants}>
          <AnimatedButton
            IconComponent={AiOutlineFundProjectionScreen}
            bgColor='bg-warning hover:bg-warning-500'
            href={project.live}
            target='_blank'
            text='See Live'
            textColor='text-gray-800 text-sm mt-5'
          />
        </motion.div>
        <motion.div variants={buttonVariants}>
          <AnimatedButton
            IconComponent={TbFileDescription}
            bgColor='bg-transparent'
            borderColor='border-warning-500'
            href={`/projects/${project._id}`}
            target='_self'
            text='Details'
            textColor='text-[#F5A524] text-sm mt-5'
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
