'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Palette, Code, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';

import { Title } from './title';

const ProcessSection = () => {
  const processSteps = [
    {
      step: '01',
      title: 'Planning & Discovery',
      description:
        'Understanding your business goals, target audience, and technical requirements to create a comprehensive project roadmap.',
      icon: ClipboardList,
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description:
        'Creating wireframes, mockups, and interactive prototypes that align with your brand and provide exceptional user experience.',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
    },
    {
      step: '03',
      title: 'Development & Integration',
      description: 'Building scalable, performant applications using modern technologies with clean code architecture and best practices.',
      icon: Code,
      color: 'from-warning to-orange-500',
    },
    {
      step: '04',
      title: 'Testing & Quality Assurance',
      description: 'Comprehensive testing across devices and browsers to ensure reliability, performance, and security before launch.',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
    },
    {
      step: '05',
      title: 'Delivery & Support',
      description: "Seamless deployment with documentation, training, and ongoing support to ensure your project's continued success.",
      icon: Rocket,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className='relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20'>
      <Title title1='Process' title2='How I Work' />
      <p className='mt-3 text-center text-gray-400 dark:text-gray-500 max-w-2xl mx-auto text-sm md:text-base'>
        A proven methodology that ensures quality delivery from concept to launch
      </p>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-4 xl:gap-6 mt-14 md:mt-16'
      >
        {processSteps.map((process, index) => {
          const IconComponent = process.icon;
          return (
            <motion.div key={process.step} variants={cardVariants} className='group relative'>
              <div className='relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/50 shadow-lg hover:shadow-purple-300/30 dark:hover:shadow-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 p-6 md:p-5 xl:p-6 h-full flex flex-col'>
                {/* Gradient accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${process.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Subtle glow on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${process.color}`}
                />

                <div className='relative z-10 flex flex-col h-full'>
                  {/* Icon with gradient background */}
                  <div className='mb-5 flex items-start justify-between'>
                    <div
                      className={`relative p-3 rounded-xl bg-gradient-to-br ${process.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className='w-5 h-5 text-white' strokeWidth={2.5} />
                    </div>
                    <span className='text-xs font-bold text-purple-600 dark:text-purple-400 opacity-60'>{process.step}</span>
                  </div>

                  {/* Title */}
                  <h3 className='text-base md:text-md font-bold text-purple-900 dark:text-purple-100 mb-3 leading-tight'>
                    {process.title}
                  </h3>

                  {/* Description */}
                  <p className='text-xs text-purple-700 dark:text-purple-300 leading-relaxed flex-1 text-left'>{process.description}</p>

                  {/* Arrow indicator on hover */}
                  <div className='mt-4 pt-4 border-t border-purple-200 dark:border-purple-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex items-center text-xs font-medium text-purple-600 dark:text-purple-400'>
                      <span>Learn more</span>
                      <ArrowRight className='w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform' />
                    </div>
                  </div>
                </div>

                {/* Connecting arrow (except for last item on XL screens) */}
                {index < processSteps.length - 1 && (
                  <div className='hidden xl:block absolute -right-2 xl:-right-3 top-1/2 transform -translate-y-1/2 z-20 text-purple-400 dark:text-purple-600 opacity-40'>
                    <ArrowRight className='w-5 h-5' />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className='mt-16 md:mt-20 text-center'
      >
        <p className='text-gray-400 dark:text-gray-500 text-sm md:text-base mb-5'>Ready to start your project with a proven process?</p>
        <a
          href='/contact'
          className='inline-flex items-center justify-center gap-2 rounded-full bg-warning text-gray-50 font-semibold px-6 py-3 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-warning/50'
        >
          Let's Discuss Your Project
          <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
        </a>
      </motion.div>
    </div>
  );
};

export default ProcessSection;
