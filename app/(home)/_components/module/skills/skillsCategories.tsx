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

const SkillCategories: FC = () => {
  const categories = Object.values(SkillCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend');
  const [skillsByCategory, setSkillsByCategory] = useState<
    Record<string, TSkill[]>
  >({});

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cardContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardItem = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const fetchAllSkills = async () => {
      const res = await getAllSkills();

      const grouped: Record<string, TSkill[]> = {};

      res?.data?.forEach((skill: TSkill) => {
        if (!grouped[skill.category]) {
          grouped[skill.category] = [];
        }
        grouped[skill.category].push(skill);
      });

      setSkillsByCategory(grouped);
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

  return (
    <section ref={containerRef} className="relative w-full">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        <div className="w-full md:w-3/5 pt-10 md:pt-20">
          {categories.map((category, index) => {
            const skills = skillsByCategory[category];
            const isLoading = !skills;

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
                    {isLoading ? (
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

        <div className="hidden md:flex md:w-2/5 sticky top-24 h-[calc(100vh-6rem)] items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {
                categoryIllustrations[
                  selectedCategory as keyof typeof categoryIllustrations
                ]
              }

              <motion.div
                className="absolute -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-80 h-80 rounded-full border-2 border-dashed border-purple-300 opacity-30" />
              </motion.div>

              <motion.div
                className="absolute w-24 h-24 rounded-full bg-purple-500 opacity-20 -top-6 right-24"
                animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />

              <motion.div
                className="absolute w-16 h-16 rounded-full bg-purple-700 opacity-30 bottom-12 left-20"
                animate={{ y: [0, 12, 0], scale: [1, 1.2, 1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 1,
                }}
              />

              <motion.div
                className="absolute w-32 h-32 rounded-full bg-purple-300 opacity-20 -bottom-10 right-16"
                animate={{ y: [0, 8, 0], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 2,
                }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="text-sm font-semibold text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-100 dark:border-purple-900 shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {selectedCategory} Skills
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillCategories;
