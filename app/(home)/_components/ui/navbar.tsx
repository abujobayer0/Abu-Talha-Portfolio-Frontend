'use client';

import React, { useState, useEffect } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  NavbarBrand,
} from '@nextui-org/navbar';
import { Link as ScrollLink, Events } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Search } from 'lucide-react';

import { linkVariants, menuVariants } from './animation';
import Logo from './logo';
import NavButtons from './navButtons';
import AnimatedButton from './button';
import SearchBar from './searchBar';

import { siteConfig } from '@/config/site';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';

const underlineVariants = {
  initial: { width: 0 },
  whileHover: {
    width: '100%',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const Navbar = ({ activeSection = '' }) => {
  const router = useRouter();
  const [shouldHideOnScroll, setShouldHideOnScroll] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Register scroll events
  useEffect(() => {
    Events.scrollEvent.register('begin', () => {
      // Close mobile menu when scrolling begins
      setIsMenuOpen(false);
    });

    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  const handleLinkClick = () => {
    setShouldHideOnScroll(false);
    setIsMenuOpen(false);
    router.push('/');
  };

  return (
    <NextUINavbar
      className='sticky top-0 z-50 rounded-full border border-default-200 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md my-2 mx-auto max-w-7xl'
      maxWidth='xl'
      shouldHideOnScroll={shouldHideOnScroll}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Brand and logo */}
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand className='gap-3 max-w-fit'>
          <Logo />
        </NavbarBrand>

        {/* Desktop links with animation */}
        <div className='hidden xl:flex gap-4 justify-start'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <motion.div animate='animate' initial='initial' variants={linkVariants} whileHover='whileHover' className='relative'>
                <ScrollLink
                  className={clsx(
                    'cursor-pointer text-default-800 hover:text-warning',
                    activeSection === item.href.substring(1) && 'text-warning font-medium'
                  )}
                  color='black'
                  duration={500}
                  offset={-90}
                  smooth={true}
                  spy={true}
                  activeClass='active'
                  to={item.href.substring(1)}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </ScrollLink>
                {/* Animated underline */}
                <motion.div
                  className='absolute left-0 bottom-[-2px] h-[2px] bg-warning'
                  variants={underlineVariants}
                  initial='initial'
                  animate={activeSection === item.href.substring(1) ? 'whileHover' : 'initial'}
                />
              </motion.div>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Right section: Search, Theme Switch and Buttons */}
      <NavbarContent className='hidden xl:flex basis-1/5 sm:basis-full' justify='end'>
        <NavbarItem className='hidden sm:flex gap-2 items-center'>
          {/* Search Button */}
          <Button
            isIconOnly
            aria-label='Search'
            onClick={() => setIsSearchOpen(true)}
            color='warning'
            radius='full'
            size='sm'
            variant='faded'
            className='min-w-0'
          >
            <Search className='w-4 h-4 text-default-500' />
          </Button>

          {/* Hide NavButtons when search is open */}
          <AnimatePresence mode='wait'>
            {!isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NavButtons />
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className='flex xl:hidden basis-1 pl-4 gap-2' justify='end'>
        {/* Mobile Search Button */}
        <Button
          isIconOnly
          aria-label='Search'
          onClick={() => setIsSearchOpen(true)}
          color='warning'
          radius='full'
          size='sm'
          variant='faded'
          className='min-w-0'
        >
          <Search className='w-4 h-4 text-default-500' />
        </Button>
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile menu with staggered animation */}
      <NavbarMenu
        animate='open'
        as={motion.div}
        className='flex flex-col items-center pt-8'
        exit='closed'
        initial='closed'
        variants={menuVariants}
      >
        <div className='mx-4 mt-2 flex flex-col gap-2 items-center justify-center space-y-5'>
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <motion.div animate='animate' initial='initial' variants={linkVariants} whileHover='whileHover' className='relative'>
                <ScrollLink
                  className={clsx('cursor-pointer text-foreground', activeSection === item.href.substring(1) && 'text-warning font-medium')}
                  duration={500}
                  offset={-70}
                  smooth={true}
                  spy={true}
                  activeClass='active'
                  to={item.href.substring(1)}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </ScrollLink>
                {/* Animated underline */}
                <motion.div
                  className='absolute left-0 bottom-[-2px] h-[2px] bg-warning'
                  variants={underlineVariants}
                  initial='initial'
                  animate={activeSection === item.href.substring(1) ? 'whileHover' : 'initial'}
                />
              </motion.div>
            </NavbarMenuItem>
          ))}
        </div>
        <div className='mt-8'>
          <NavButtons />
        </div>
        <NavbarItem className='mt-4'>
          <AnimatedButton href='/dashboard' text='Dashboard' />
        </NavbarItem>
      </NavbarMenu>

      {/* Search Bar Component */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </NextUINavbar>
  );
};
