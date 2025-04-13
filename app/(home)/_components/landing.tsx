'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import $ from 'jquery';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

import AnimatedButton from './ui/button';
import ImageBox from './module/banner/imageBox';

import { useGetLink } from '@/hooks/links.hook';
import { useGetAllAbout } from '@/hooks/about.hook';

const Landing = () => {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');
  const { data: aboutData, isLoading } = useGetAllAbout();
  const [text] = useTypewriter({
    words: [
      'Full Stack Developer.',
      'Frontend Developer.',
      'Backend Developer',
      'React Developer',
      'MERN Stack Developer',
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  useEffect(() => {
    // jQuery for advanced image animations
    $('.profile-img').hover(
      function () {
        $(this).css({
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
        });
      },
      function () {
        $(this).css({
          transform: 'scale(1)',
        });
      }
    );

    $('.profile-img').click(function () {
      $(this).css({
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)',
        transition: 'box-shadow 0.3s ease-in-out',
      });
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center px-5 mt-10  md:mt-32 md:mb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Profile Image */}
          <ImageBox
            imageUrl={
              (!isLoading && aboutData?.data[0]?.image) ||
              'https://i.ibb.co.com/yFgLxsCX/IMG-6807.jpg'
            }
            link="#contact"
            name={'Abu Talha'}
            title="Full Stack Developer"
          />
          {/* Content Section */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-8/12"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-default-800">
                Hello, I&apos;m{' '}
                <span className="text-[#9333ea]">
                  {(!isLoading && aboutData?.data[0]?.me?.name) ||
                    'Abu Talha Md Jobayer'}
                </span>
              </h1>

              <h2 className="text-xl md:text-3xl text-default-700 mt-4">
                A {text}
                <Cursor cursorColor="#9333ea" />
              </h2>
              <p className="text-default-700 mt-6 leading-relaxed">
                A Full Stack Developer from Bogura, Bangladesh, with a Diploma
                in Computer Science from Naogaon Polytechnic Institute. I design
                and develop dynamic websites, robust backend systems, engaging
                frontend interfaces, scalable platforms, and intuitive mobile
                apps. My focus is on delivering seamless, user-centric solutions
                that drive impact and meet client goals. I thrive in
                collaborative environments, bringing adaptability and a passion
                for innovation to every project. Fluent in English and Bangla,
                with conversational Hindi, I’m committed to creating
                high-quality, modern solutions that empower businesses and
                elevate user experiences worldwide.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                <AnimatedButton
                  bgColor="bg-[#9333ea] hover:bg-[#9333ea]"
                  href={
                    link?.data?.resume ||
                    'https://drive.google.com/file/d/15OqqkOMwSooI_iuQhrb7bCAQLEGug-sN/view?usp=drive_link'
                  }
                  target="_blank"
                  text="View Resume"
                  textColor="#fff"
                />
                <AnimatedButton
                  IconComponent={AiOutlineFundProjectionScreen}
                  bgColor="bg-transparent"
                  borderColor="border-[#9333ea]"
                  href="#projects"
                  target="_self"
                  text="Explore Projects"
                  textColor="text-[#9333ea]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="absolute top-0 left-0 w-full h-[60px] bg-[#9333ea] blur-[150px] transform rotate-45" />
      </div>
    </>
  );
};

export default Landing;
