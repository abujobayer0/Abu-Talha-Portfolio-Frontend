'use client';

import Link from 'next/link';
import React, { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/button';

import { siteConfig } from '@/config/site';
import Logo from '@/app/(home)/_components/ui/logo';

export default function SidebarMain({ children }: { children: ReactNode }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    expanded: {
      width: 280,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    collapsed: {
      width: 80,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.03, duration: 0.3 },
    }),
  };

  const linkTextVariants = {
    expanded: { opacity: 1, display: 'inline', x: 0 },
    collapsed: { opacity: 0, x: -10, transitionEnd: { display: 'none' } },
  };

  return (
    <div className='flex h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-purple-950/20 p-4 gap-4'>
      {/* Sidebar */}
      <motion.aside
        animate={isLargeScreen ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        className='relative h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-purple-200/50 dark:border-purple-900/50 shadow-xl z-20 flex flex-col overflow-hidden rounded-2xl flex-shrink-0'
      >
        {/* Gradient accent at top */}
        <div className='h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-t-2xl' />

        <div className='flex flex-col h-full py-6 px-4'>
          {/* Logo Section */}
          <motion.div className='mb-8'>
            <Link
              href='/'
              className='flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group'
            >
              <div className='relative'>
                <Logo />
                <div className='absolute inset-0 bg-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity' />
              </div>
              <AnimatePresence mode='wait'>
                {isLargeScreen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className='text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'
                  >
                    Dashboard
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

          {/* Nav Section */}
          <motion.nav className='flex flex-col flex-1 gap-2 overflow-y-auto scrollbar-hide px-1' initial='hidden' animate='visible'>
            {siteConfig.dashboardMenuItems.map((item, i) => {
              const isActive = pathname === item.path;
              return (
                <motion.div key={i} variants={menuItemVariants} custom={i} className='relative'>
                  <Button
                    as={Link}
                    href={item.path}
                    variant={isActive ? 'solid' : 'light'}
                    color={isActive ? 'secondary' : 'default'}
                    className={`relative justify-start h-auto min-w-0 px-4 py-3 transition-all duration-300 group overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white shadow-lg shadow-purple-500/40 font-semibold border border-purple-400/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50/70 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-800 border border-transparent'
                    }`}
                    radius='lg'
                    fullWidth
                  >
                    {/* Active shimmer effect */}
                    {isActive && (
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                    )}

                    {/* Active background glow */}
                    {isActive && (
                      <motion.div
                        layoutId='activeBg'
                        className='absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/30 to-indigo-500/30 blur-2xl -z-10'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Left border indicator for active */}
                    {isActive && (
                      <motion.div
                        layoutId='activeBorder'
                        className='absolute left-0 top-1 bottom-1 w-1 bg-white rounded-r-full shadow-lg shadow-white/50'
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    <motion.div
                      animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className='flex items-center gap-3 w-full relative z-10'
                    >
                      <motion.div animate={isActive ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.5 }}>
                        <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white drop-shadow-sm' : 'text-current'}`} />
                      </motion.div>
                      <AnimatePresence mode='wait'>
                        {isLargeScreen && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className={`text-sm font-medium whitespace-nowrap flex-1 text-left ${
                              isActive ? 'text-white drop-shadow-sm' : ''
                            }`}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Active indicator dot on right */}
                    {isActive && (
                      <motion.div
                        layoutId='activeDot'
                        className='absolute right-3 w-2 h-2 rounded-full bg-white/90 shadow-md'
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Bottom Section */}
          <div className='mt-auto pt-4 border-t border-purple-200/50 dark:border-purple-900/50'>
            <AnimatePresence>
              {isLargeScreen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='px-3 py-2 text-xs text-gray-500 dark:text-gray-400 text-center'
                >
                  Admin Panel
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <main className='flex-1 p-6 overflow-y-auto scrollbar-hide rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full border border-purple-100/50 dark:border-purple-900/30 shadow-lg'>
        {children}
      </main>
    </div>
  );
}
