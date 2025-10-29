'use client';

import { ReactNode } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import Footer from './_components/footer';
import { Navbar } from './_components/ui/navbar';

interface CommonLayoutProps {
  children: ReactNode;
  aboutMe: ReactNode;
  // education: ReactNode;
  experience: ReactNode;
  skills: ReactNode;
  projects: ReactNode;
  myBlogs: ReactNode;
  contactMe: ReactNode;
}

// Animation variants for section entrance
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function CommonLayout({
  children,
  aboutMe,
  // education,
  experience,
  skills,
  projects,
  myBlogs,
  contactMe,
}: CommonLayoutProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div className='space-y-5 pt-4 px-2'>
        <Navbar />

        <div className='space-y-20 md:space-y-28'>
          <section id='home' className='pt-4 min-h-[80vh] flex items-center'>
            <m.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className='w-full'
            >
              {children}
            </m.div>
          </section>

          {/* Projects section */}
          <section id='projects' className='pt-16 min-h-[80vh]'>
            <m.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
              {projects}
            </m.div>
          </section>

          {/* Skills section */}
          <section id='skills' className='pt-16 min-h-[80vh]'>
            <m.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
              {skills}
            </m.div>
          </section>

          {/* Experience section */}
          <section id='experience' className='pt-16 min-h-[80vh]'>
            <m.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
              {experience}
            </m.div>
          </section>

          {/* About section */}
          <section id='about' className='pt-16 min-h-[80vh]'>
            <m.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
              {aboutMe}
            </m.div>
          </section>

          {/* Blogs section */}
          <section id='blogs' className='pt-16 min-h-[80vh]'>
            <m.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
              {myBlogs}
            </m.div>
          </section>

          {/* Contact section */}
          <section id='contact' className='pt-16 min-h-[80vh]'>
            <m.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
              {contactMe}
            </m.div>
          </section>
        </div>

        <Footer />
      </div>
    </LazyMotion>
  );
}
