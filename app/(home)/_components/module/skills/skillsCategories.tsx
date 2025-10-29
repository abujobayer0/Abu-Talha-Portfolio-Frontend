'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsCard from './skillsCard';
import SkillsSkeleton from '../../ui/skeleton/skillSkeleton';
import { TSkill } from '@/types';
import { SkillCategory } from '@/constants/skills.constants';
import { categoryIllustrations } from './categoryIllustrations';
import { getAllSkills } from '@/service/skillsService/skillsService';

const SkillCategories: FC = () => {
  const categories = Object.values(SkillCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend');
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, TSkill[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');

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

  // Filter skills based on search term
  const filteredSkills =
    searchTerm && skillsByCategory[selectedCategory]
      ? skillsByCategory[selectedCategory].filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : skillsByCategory[selectedCategory] || [];

  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-12'>
      {/* Floating category navigation */}
      <div className='sticky top-4 z-50 mb-8'>
        <motion.div
          className='flex items-center gap-1 p-1.5 mx-auto w-fit rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-lg border border-purple-100/30 dark:border-purple-900/30'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearchTerm('');
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category && (
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full -z-10'
                  layoutId='activeCategory'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Header with search and view controls */}
      <motion.div
        className='mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 md:h-12 md:w-12 flex-shrink-0'>
            {categoryIllustrations[selectedCategory as keyof typeof categoryIllustrations]}
          </div>
          <h2 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent'>
            {selectedCategory}
          </h2>
        </div>

        <div className='flex items-center gap-3 w-full sm:w-auto'>
          {/* Search input */}
          <div className='relative w-full sm:w-64'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search skills...'
              className='w-full px-4 py-2 pl-10 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-purple-100/50 dark:border-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all'
            />
            <svg
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
            </svg>
          </div>

          {/* View toggle */}
          <div className='flex items-center gap-1 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-purple-100/50 dark:border-purple-900/30 p-1'>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${
                viewMode === 'grid'
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='3' y='3' width='7' height='7'></rect>
                <rect x='14' y='3' width='7' height='7'></rect>
                <rect x='3' y='14' width='7' height='7'></rect>
                <rect x='14' y='14' width='7' height='7'></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${
                viewMode === 'list'
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='8' y1='6' x2='21' y2='6'></line>
                <line x1='8' y1='12' x2='21' y2='12'></line>
                <line x1='8' y1='18' x2='21' y2='18'></line>
                <line x1='3' y1='6' x2='3.01' y2='6'></line>
                <line x1='3' y1='12' x2='3.01' y2='12'></line>
                <line x1='3' y1='18' x2='3.01' y2='18'></line>
              </svg>
            </button>
          </div>

          {/* Density toggle */}
          <div className='hidden sm:flex items-center gap-1 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-purple-100/50 dark:border-purple-900/30 p-1'>
            <button
              onClick={() => setDensity('compact')}
              className={`px-2 py-1 rounded text-xs ${
                density === 'compact'
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              Compact
            </button>
            <button
              onClick={() => setDensity('comfortable')}
              className={`px-2 py-1 rounded text-xs ${
                density === 'comfortable'
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              Cozy
            </button>
          </div>
        </div>
      </motion.div>

      {/* Empty state */}
      {!isLoading && filteredSkills.length === 0 && (
        <motion.div
          className='flex flex-col items-center justify-center py-16 text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className='w-20 h-20 mb-4 text-purple-300 dark:text-purple-700 opacity-70'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='10'></circle>
              <path d='M8 15h8'></path>
              <path d='M9 9h.01'></path>
              <path d='M15 9h.01'></path>
            </svg>
          </div>
          {searchTerm ? (
            <>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>No matching skills found</h3>
              <p className='text-gray-600 dark:text-gray-400 max-w-md'>
                No skills match your search "{searchTerm}" in the {selectedCategory} category.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className='mt-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors'
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>No skills available</h3>
              <p className='text-gray-600 dark:text-gray-400 max-w-md'>
                No skills are currently available in the {selectedCategory} category.
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* Content with grid/list view */}
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <motion.div
            key='loading'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === 'grid'
                ? density === 'compact'
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'flex flex-wrap gap-2'
            }
          >
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={viewMode === 'list' ? 'w-auto' : ''}>
                <SkillsSkeleton />
              </div>
            ))}
          </motion.div>
        ) : (
          filteredSkills.length > 0 && (
            <>
              {viewMode === 'grid' ? (
                <motion.div
                  key={`${selectedCategory}-${viewMode}-${density}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    density === 'compact'
                      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'
                      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  }
                >
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.04, duration: 0.25 },
                      }}
                      className={density === 'compact' ? 'origin-top-left scale-[0.97]' : ''}
                    >
                      <SkillsCard skill={skill} variant={'vertical'} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`${selectedCategory}-list-${density}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex flex-wrap gap-2'
                >
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.2 }}
                      className='group'
                    >
                      <div className='flex items-center gap-2 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-purple-100/50 dark:border-purple-900/30 px-3 py-1 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-md transition-all'>
                        <img src={skill.icon} alt={skill.name} className='size-4 md:size-5 rounded-full' />
                        <span className='text-xs md:text-sm text-purple-800 dark:text-purple-200 font-medium'>{skill.name}</span>
                        <span className='ml-1 inline-flex items-center gap-1 text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-purple-100/70 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'>
                          <span className='inline-block size-1.5 rounded-full bg-purple-500' />
                          {skill.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )
        )}
      </AnimatePresence>

      {/* Skills summary */}
      {!isLoading && filteredSkills.length > 0 && (
        <motion.div
          className='mt-12 pt-6 border-t border-purple-100/30 dark:border-purple-900/30 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          <p>
            Showing {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
            {searchTerm ? ` matching "${searchTerm}"` : ''} in {selectedCategory}
          </p>

          <span className='flex items-center gap-2'>
            <span className='inline-block w-2 h-2 rounded-full bg-green-500'></span>
            Updated regularly
          </span>
        </motion.div>
      )}

      {/* Quick access floating button for mobile */}
      <div className='md:hidden fixed right-4 bottom-4 z-50'>
        <motion.button
          className='flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/20'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Scroll to top of categories
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='12' y1='19' x2='12' y2='5'></line>
            <polyline points='5 12 12 5 19 12'></polyline>
          </svg>
        </motion.button>
      </div>
    </section>
  );
};

export default SkillCategories;
