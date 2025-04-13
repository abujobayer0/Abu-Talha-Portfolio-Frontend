'use client';

import { ReactNode } from 'react';
import { Element } from 'react-scroll';

import Footer from './_components/footer';
import { Navbar } from './_components/ui/navbar';
import SmoothScrollWrapper from './_components/ui/ScrollAnimation';

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
    <div className="space-y-5 pt-4 px-2">
      <Navbar />

      <SmoothScrollWrapper />

      {/* Main content */}
      <Element name="home">
        <div>{children}</div>
      </Element>

      {/* Skills section with animation */}
      <Element name="skills">
        <div>{skills}</div>
      </Element>

      {/* Experience section with animation */}
      <Element name="experience">
        <div>{experience}</div>
      </Element>

      {/* About section with animation */}
      <Element name="about">
        <div>{aboutMe}</div>
      </Element>

      {/* Education section with animation */}
      {/* <Element name="education">
        <div>{education}</div>
      </Element> */}

      {/* Projects section with animation */}
      <Element name="projects">
        <div>{projects}</div>
      </Element>

      {/* Blogs section with animation */}
      <Element name="blogs">
        <div>{myBlogs}</div>
      </Element>

      {/* Contact section with animation */}
      <Element name="contact">
        <div>{contactMe}</div>
      </Element>
      <Footer />
    </div>
  );
}
