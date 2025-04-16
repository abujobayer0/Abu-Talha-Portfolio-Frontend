'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsCard from './skillsCard';
import SkillsSkeleton from '../../ui/skeleton/skillSkeleton';
import { TSkill } from '@/types';
import { SkillCategory } from '@/constants/skills.constants';
import { categoryIllustrations } from './categoryIllustrations';
import { getAllSkills } from '@/service/skillsService/skillsService';
import { Title } from '../../ui/title';
import GridBackgrounds from '@/components/common/backgrounds/grid';

const SkillCategories: FC = () => {
  const categories = Object.values(SkillCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend');
  const [skillsByCategory, setSkillsByCategory] = useState<
    Record<string, TSkill[]>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryNavRef = useRef<HTMLDivElement>(null);

  const cardContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const cardItem = {
    hidden: { y: 10, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  useEffect(() => {
    const fetchAllSkills = async () => {
      setIsLoading(true);
      try {
        const res = await getAllSkills();
        const grouped: Record<string, TSkill[]> = {};

        res?.data?.forEach((skill: TSkill) => {
          if (!grouped[skill.category]) {
            grouped[skill.category] = [];
          }
          grouped[skill.category].push(skill);
        });

        setSkillsByCategory(grouped);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSkills();
  }, []);

  // Scroll observer to change selected category
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, categories.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setSelectedCategory(categories[index]);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [categories]);

  // Handle category navigation click
  const scrollToCategory = (category: string, index: number) => {
    setSelectedCategory(category);
    setActiveIndex(index);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const offset = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen">
      {/* Mobile category navigation */}
      <div className="md:hidden sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-purple-100/30 dark:border-purple-900/30">
        <div className="overflow-x-auto scrollbar-hide pb-2">
          <div className="flex space-x-2 px-4 py-3">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category, index)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Desktop category navigation */}
        <div
          ref={categoryNavRef}
          className="hidden md:block md:w-1/5 sticky top-24 h-[calc(100vh-6rem)] overflow-auto scrollbar-hide pt-24"
        >
          <div className="flex flex-col space-y-2 pr-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => scrollToCategory(category, index)}
                className={`relative group px-4 py-3 text-left rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500/20 to-purple-500/5 text-purple-700 dark:text-purple-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {selectedCategory === category && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"
                    layoutId="activeCategoryIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {category}
                {selectedCategory === category && (
                  <motion.div
                    className="absolute right-2 top-1/3 transform -translate-y-1/2"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-4 h-4 text-purple-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
        <GridBackgrounds />
        {/* Main content */}
        <div className="w-full md:w-3/5 pt-10 md:pt-20">
          {categories.map((category, index) => {
            const skills = skillsByCategory[category];
            const categoryIsLoading = isLoading || !skills;

            return (
              <div
                key={category}
                ref={(el: any) => (sectionRefs.current[index] = el)}
                data-index={index}
                className="min-h-screen flex items-start md:items-center px-6 py-16 md:py-32 transition-all duration-300"
                id={`category-${category}`}
              >
                <div className="w-full mb-20">
                  <Title title1={category} title2={category} />

                  <motion.div
                    className="flex flex-wrap justify-center pt-20 gap-6"
                    variants={cardContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    {categoryIsLoading ? (
                      Array.from({ length: 6 }, (_, i) => (
                        <motion.div
                          key={i}
                          variants={cardItem}
                          className="w-full sm:w-64"
                        >
                          <SkillsSkeleton />
                        </motion.div>
                      ))
                    ) : skills.length > 0 ? (
                      skills.map((skill) => (
                        <motion.div
                          key={skill._id}
                          variants={cardItem}
                          className="w-full sm:w-64"
                        >
                          <SkillsCard skill={skill} />
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        className="w-full flex justify-center py-16"
                        variants={cardItem}
                      >
                        <div className="text-center p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-md border border-purple-100 dark:border-purple-900">
                          <svg
                            className="w-12 h-12 mx-auto text-purple-400 mb-3 opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          <p className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
                            No Skills Available
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Data not available for this category yet.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Updated Illustration panel - modern and aesthetic with lighter animations */}
        <div className="hidden md:flex md:w-1/5 sticky top-24 h-[calc(100vh-6rem)] items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="relative w-full max-w-xs aspect-square flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Glass background for the illustration */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br -z-10 from-white/20 to-purple-50/30 dark:from-gray-900/20 dark:to-purple-900/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-purple-900/20"
                initial={{ scale: 0.9, borderRadius: '30%' }}
                animate={{ scale: 1, borderRadius: '24px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />

              {
                categoryIllustrations[
                  selectedCategory as keyof typeof categoryIllustrations
                ]
              }

              {/* Background subtle animated elements */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/5 blur-2xl -z-10"
                animate={{
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-l from-indigo-400/10 to-blue-400/5 blur-2xl -z-10"
                animate={{
                  x: [0, -5, 0],
                  y: [0, 5, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />

              {/* Subtle ring animation */}
              <motion.div
                className="absolute w-full h-full rounded-full border border-purple-300/20 dark:border-purple-400/10 -z-10"
                animate={{
                  scale: [0.85, 1.05, 0.85],
                  opacity: [0.3, 0.15, 0.3],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Category indicator with neat animation */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 py-2 px-6 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-purple-100/50 dark:border-purple-900/30 z-20"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.span
                  className="text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {selectedCategory}
                </motion.span>
              </motion.div>

              {/* Floating dots around the illustration */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-purple-500/80 dark:bg-purple-400/80"
                style={{ top: '15%', right: '10%' }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/80 dark:bg-indigo-300/80"
                style={{ bottom: '25%', left: '15%' }}
                animate={{
                  y: [0, 6, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />

              <motion.div
                className="absolute w-1 h-1 rounded-full bg-pink-400/90 dark:bg-pink-300/90"
                style={{ top: '30%', left: '10%' }}
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Quick category navigation for mobile - fixed at bottom */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          className="flex justify-center items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border border-purple-100 dark:border-purple-800"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={`nav-${category}`}
              onClick={() => scrollToCategory(category, index)}
              className={`size-3 rounded-full ${
                activeIndex === index
                  ? 'bg-purple-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
              } transition-all duration-300`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillCategories;
