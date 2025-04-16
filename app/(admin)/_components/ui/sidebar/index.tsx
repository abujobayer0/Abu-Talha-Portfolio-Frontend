'use client';

import Link from 'next/link';
import React, { ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

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
      width: 260,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    collapsed: {
      width: 72,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  const linkTextVariants = {
    expanded: { opacity: 1, display: 'inline' },
    collapsed: { opacity: 0, transitionEnd: { display: 'none' } },
  };

  return (
    <div className="flex h-screen bg-default-50">
      {/* Sidebar */}
      <motion.aside
        animate={isLargeScreen ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 dark:bg-zinc-900 dark:border-zinc-700 shadow-sm z-20 flex flex-col justify-between py-6"
      >
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-4">
            <Logo />
            <motion.span
              className="text-lg font-semibold text-zinc-800 dark:text-white hidden lg:inline"
              animate={isLargeScreen ? 'expanded' : 'collapsed'}
              variants={linkTextVariants}
            >
              Siyte
            </motion.span>
          </Link>

          {/* Nav */}
          <motion.nav
            className="flex flex-col w-full items-center lg:items-start gap-2 mt-6 px-2"
            initial="hidden"
            animate="visible"
          >
            {siteConfig.dashboardMenuItems.map((item, i) => {
              const isActive = pathname === item.path;
              return (
                <motion.div
                  key={i}
                  variants={menuItemVariants}
                  custom={i}
                  className="w-full"
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-300 group ${
                      isActive
                        ? 'bg-warning-500 text-white'
                        : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <motion.span
                      className="text-sm font-medium"
                      animate={isLargeScreen ? 'expanded' : 'collapsed'}
                      variants={linkTextVariants}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        </div>
      </motion.aside>

      {/* Content */}
      <main className="flex-1 ml-[72px] lg:ml-[260px] p-6 overflow-y-auto scrollbar-hide">
        {children}
      </main>
    </div>
  );
}
