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

  // Monitor screen size
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: {
      width: '270px',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    collapsed: {
      width: '50px',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  // Menu items staggered animation
  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1, // delay each item a bit more for stagger effect
        duration: 0.3,
        ease: 'easeInOut',
      },
    }),
  };

  // Link text animation
  const linkTextVariants = {
    expanded: {
      opacity: 1,
      display: 'block',
      transition: { delay: 0.2 },
    },
    collapsed: {
      opacity: 0,
      display: 'none',
      transition: { delay: 0.2 },
    },
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.aside
        animate={isLargeScreen ? 'expanded' : 'collapsed'}
        className="text-default-800 transition-all duration-300 ease-in-out h-screen lg:static flex flex-col items-center z-10 bg-default-50 fixed"
        variants={sidebarVariants}
      >
        {/* Sidebar Logo */}
        <Link
          href={'/'}
          className="flex items-start text-lg font-semibold py-4 md:p-4 cursor-pointer"
        >
          <Logo />
        </Link>

        {/* Sidebar Navigation */}
        <motion.nav animate="visible" className="space-y-4" initial="hidden">
          {siteConfig.dashboardMenuItems.map((route, index) => (
            <motion.div
              key={index}
              className="p-2"
              custom={index}
              variants={menuItemVariants}
            >
              <Link
                className={`flex items-center space-x-2 p-2 md:py-2 lg:px-4 rounded-md hover:bg-warning-400 hover:text-default-100 transition whitespace-nowrap ${route.path === pathname ? 'bg-warning-400 text-default-50' : ''}`}
                href={route.path}
              >
                <route.icon className="size-4" />
                <motion.span
                  animate={isLargeScreen ? 'expanded' : 'collapsed'}
                  className="text-sm lg:block hidden"
                  variants={linkTextVariants}
                >
                  {route.name}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.aside>

      {/* Main Content */}
      <motion.div className="flex-1 p-6 h-screen overflow-y-scroll scrollbar-hide ml-8 lg:ml-0">
        {children}
      </motion.div>
    </div>
  );
}
