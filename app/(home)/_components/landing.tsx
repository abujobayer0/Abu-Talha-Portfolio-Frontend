'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import $ from 'jquery';
import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

import AnimatedButton from './ui/button';
import ImageBox from './module/banner/imageBox';

import { useGetLink } from '@/hooks/links.hook';
import { useGetAllAbout } from '@/hooks/about.hook';

const Landing = () => {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');
  const { data: aboutData, isLoading } = useGetAllAbout();
  const [text] = useTypewriter({
    words: ['Full Stack Developer.', 'Frontend Developer.', 'Backend Developer', 'React Developer', 'MERN Stack Developer'],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    $('.profile-img').hover(
      function () {
        $(this).css({
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
        });
      },
      function () {
        $(this).css({ transform: 'scale(1)' });
      }
    );

    $('.profile-img').click(function () {
      $(this).css({
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)',
        transition: 'box-shadow 0.3s ease-in-out',
      });
    });

    // Animate h1 and paragraph after fonts load
    document.fonts.ready.then(() => {
      if (!contentRef.current) return;

      const h1 = contentRef.current.querySelector('h1');
      const p = contentRef.current.querySelector('p');

      if (h1) {
        const { words } = splitText(h1);

        const whiteWords = ['Hello,', "I'm"];

        words.forEach((wordEl) => {
          const wordText = wordEl.textContent?.trim();
          if (whiteWords.includes(wordText || '')) {
            wordEl.style.color = '#ffffff';
          } else {
            wordEl.style.color = '#9333ea';
          }
        });

        // Animate
        animate(
          words,
          { opacity: [0, 1], y: [10, 0] },
          {
            type: 'spring',
            duration: 2,
            bounce: 0,
            delay: stagger(0.04),
          }
        );
      }

      if (p) {
        const { words } = splitText(p);
        animate(
          words,
          { opacity: [0, 1], y: [8, 0] },
          {
            type: 'spring',
            duration: 2,
            bounce: 0,
            delay: stagger(0.02),
          }
        );
      }
    });
  }, []);

  return (
    <>
      <div className='w-full h-full'>
        <div className='absolute top-0 left-0 w-full h-[60px] bg-[#9333ea] blur-[150px] transform rotate-45' />
      </div>
      <div className='flex relative items-center justify-center px-5 mt-6 md:mt-20 md:mb-10'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          <ImageBox
            imageUrl={(!isLoading && aboutData?.data[0]?.image) || 'https://i.ibb.co.com/yFgLxsCX/IMG-6807.jpg'}
            link='#contact'
            name={'Abu Talha'}
            title='Full Stack Developer'
          />
          <motion.div
            ref={contentRef}
            className='w-full md:w-9/12'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className='text-center lg:text-left'>
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold'>
                Hello, I&apos;m <span className='text-[#9333ea]'>{(!isLoading && aboutData?.data[0]?.me?.name) || 'Abu Talha'}</span>
              </h1>

              <h2 className='text-2xl md:text-4xl text-gray-400 mt-3'>
                A {text}
                <Cursor cursorColor='#9333ea' />
              </h2>

              <p className='text-gray-400 mt-5 text-base md:text-lg leading-normal md:leading-relaxed'>
                I help teams and founders ship software that moves business metrics—fast, secure, and scalable. I turn ideas into
                production-ready products, focusing on performance, stability, and maintainability so you get faster pages, fewer incidents,
                and shorter release cycles. From polished UI/UX to robust APIs, databases, and CI/CD, I can own the full stack and reduce
                handoffs, accelerating time-to-value. If you need a builder who brings technical clarity, business context, and hands-on
                execution, let's talk.
              </p>

              <div className='mt-6 flex flex-wrap gap-5 justify-center lg:justify-start'>
                <AnimatedButton
                  bgColor='bg-[#9333ea] hover:bg-[#9333ea]'
                  href={link?.data?.calendly || '/contact'}
                  target='_self'
                  text='Book a Call'
                  textColor='#fff'
                />
                <AnimatedButton
                  IconComponent={AiOutlineFundProjectionScreen}
                  bgColor='bg-transparent'
                  borderColor='border-[#9333ea]'
                  href='#projects'
                  target='_self'
                  text='Explore Projects'
                  textColor='text-[#9333ea]'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Landing;
