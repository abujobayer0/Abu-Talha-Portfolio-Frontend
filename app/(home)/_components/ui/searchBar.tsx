'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, FileText, Code, Clock, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useGetAllBlogs } from '@/hooks/blogs.hook';
import { useGetAllProjects } from '@/hooks/projects.hook';
import { TBlog } from '@/types/blogsTypes';
import { TProject } from '@/types/projectsTypes';
import Image from 'next/image';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: 'blog' | 'project';
  title: string;
  description: string;
  image?: string;
  url: string;
  date?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { data: blogsData } = useGetAllBlogs();
  const { data: projectsData } = useGetAllProjects();

  const blogs: TBlog[] = blogsData?.data || [];
  const projects: TProject[] = projectsData?.data || [];

  const stripHtmlAndExcerpt = (text: string | undefined, maxLength: number = 120): string => {
    if (!text) return '';
    const stripped = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const excerpt = stripped.substring(0, maxLength);
    return excerpt + (stripped.length > maxLength ? '...' : '');
  };

  // Filter and search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search blogs
    blogs.forEach((blog) => {
      const matchesTitle = blog.title?.toLowerCase().includes(query);
      const matchesContent = blog.content?.toLowerCase().includes(query);

      if (matchesTitle || matchesContent) {
        results.push({
          id: blog._id,
          type: 'blog',
          title: blog.title || 'Untitled Blog',
          description: stripHtmlAndExcerpt(blog.content),
          image: blog.imageUrl,
          url: `/blogs/${blog._id}`,
          date: blog.createdAt,
        });
      }
    });

    // Search projects
    projects.forEach((project) => {
      const matchesTitle = project.title?.toLowerCase().includes(query);
      const matchesDescription = project.description?.toLowerCase().includes(query);
      const matchesTech = project.technologies?.some((tech: any) => tech?.name?.toLowerCase().includes(query));

      if (matchesTitle || matchesDescription || matchesTech) {
        results.push({
          id: project._id,
          type: 'project',
          title: project.title || 'Untitled Project',
          description: stripHtmlAndExcerpt(project.description),
          image: project.images?.[0],
          url: `/projects/${project._id}`,
        });
      }
    });

    // Sort by relevance (title matches first)
    return results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().startsWith(query);
      const bTitleMatch = b.title.toLowerCase().startsWith(query);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });
  }, [searchQuery, blogs, projects]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setIsFocused(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        if (!isFocused) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isFocused, onClose]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
            onClick={onClose}
          />

          {/* Search container */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className='fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4'
          >
            <div className='relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden'>
              {/* Search input */}
              <div className='relative flex items-center p-4 border-b border-gray-200 dark:border-gray-800'>
                <Search className='absolute left-6 w-5 h-5 text-gray-400 dark:text-gray-500' />
                <input
                  ref={inputRef}
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder='Search blogs and projects...'
                  className='w-full pl-12 pr-12 py-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base'
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className='absolute right-6 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                  >
                    <X className='w-4 h-4 text-gray-400' />
                  </button>
                )}
              </div>

              {/* Results */}
              <div ref={resultsRef} className='max-h-[60vh] overflow-y-auto overscroll-contain'>
                {searchQuery.length < 2 ? (
                  <div className='p-8 text-center text-gray-500 dark:text-gray-400'>
                    <Search className='w-12 h-12 mx-auto mb-3 opacity-50' />
                    <p className='text-sm'>Type at least 2 characters to search</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className='p-8 text-center text-gray-500 dark:text-gray-400'>
                    <Search className='w-12 h-12 mx-auto mb-3 opacity-50' />
                    <p className='text-sm'>No results found for &quot;{searchQuery}&quot;</p>
                  </div>
                ) : (
                  <div className='p-2'>
                    <div className='px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                      Results ({searchResults.length})
                    </div>
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={`${result.type}-${result.id}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          href={result.url}
                          onClick={onClose}
                          className='flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group'
                        >
                          {/* Image or Icon */}
                          <div className='relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800'>
                            {result.image ? (
                              <Image src={result.image} alt={result.title} fill className='object-cover' sizes='48px' unoptimized />
                            ) : (
                              <div className='w-full h-full flex items-center justify-center'>
                                {result.type === 'blog' ? (
                                  <FileText className='w-6 h-6 text-gray-400' />
                                ) : (
                                  <Code className='w-6 h-6 text-gray-400' />
                                )}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start justify-between gap-2 mb-1'>
                              <h3 className='font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-warning-500 transition-colors line-clamp-1'>
                                {result.title}
                              </h3>
                              <ExternalLink className='w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5' />
                            </div>
                            <p className='text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-1'>{result.description}</p>
                            <div className='flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500'>
                              <span className='flex items-center gap-1'>
                                {result.type === 'blog' ? (
                                  <>
                                    <FileText className='w-3 h-3' />
                                    Blog
                                  </>
                                ) : (
                                  <>
                                    <Code className='w-3 h-3' />
                                    Project
                                  </>
                                )}
                              </span>
                              {result.date && (
                                <span className='flex items-center gap-1'>
                                  <Clock className='w-3 h-3' />
                                  {formatDate(result.date)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className='px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50'>
                <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                  <span>
                    Press <kbd className='px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded'>Esc</kbd> to close
                  </span>
                  <span>↑↓ Navigate • Enter Select</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
