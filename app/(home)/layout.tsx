'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Element, Events, scrollSpy, scroller } from 'react-scroll';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import Footer from './_components/footer';
import { Navbar } from './_components/ui/navbar';
import RLoader from './_components/ui/RLoader/loading';

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
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Handle initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Setup scroll spy and event listeners with optimized settings
  useEffect(() => {
    // More performant scroll handling
    const handleScroll = () => {
      // Only update scrollSpy when needed
      scrollSpy.update();
    };

    // Configure scroll options for the entire app
    Events.scrollEvent.register('begin', (to) => {
      setActiveSection(to);
    });

    Events.scrollEvent.register('end', (to) => {
      setActiveSection(to);
    });

    // Initialize scrollSpy
    scrollSpy.update();

    // Add throttled scroll listener for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Clean up events when component unmounts
    return () => {
      window.removeEventListener('scroll', onScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  if (loading) {
    return <RLoader />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-5 pt-4 px-2">
        <Navbar activeSection={activeSection} />

        {/* Main content with appropriate spacing */}
        <div className="space-y-20 md:space-y-28">
          <Element name="home" className="pt-4 min-h-[80vh] flex items-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className="w-full"
            >
              {children}
            </m.div>
          </Element>

          {/* Skills section */}
          <Element name="skills" className="pt-16 min-h-[80vh]">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              {skills}
            </m.div>
          </Element>

          {/* Experience section */}
          <Element name="experience" className="pt-16 min-h-[80vh]">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              {experience}
            </m.div>
          </Element>

          {/* About section */}
          <Element name="about" className="pt-16 min-h-[80vh]">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              {aboutMe}
            </m.div>
          </Element>

          {/* Projects section */}
          <Element name="projects" className="pt-16 min-h-[80vh]">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              {projects}
            </m.div>
          </Element>

          {/* Blogs section */}
          <Element name="blogs" className="pt-16 min-h-[80vh]">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              {myBlogs}
            </m.div>
          </Element>

          {/* Contact section */}
          <Element name="contact" className="pt-16 min-h-[80vh]">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              {contactMe}
            </m.div>
          </Element>
        </div>

        <Footer />
      </div>
    </LazyMotion>
  );
}
