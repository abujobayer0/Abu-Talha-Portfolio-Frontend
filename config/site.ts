export type SiteConfig = typeof siteConfig;
import { FaUser, FaLaptopCode, FaGraduationCap, FaProjectDiagram, FaBlog, FaHome } from 'react-icons/fa';

export const siteConfig = {
  name: 'Abu Talha — Web & Mobile Development',
  ogImage:
    'https://i.ibb.co.com/wF9NWgf8/Building-websites-at-affordable-prices-is-a-valuable-service-that-caters-to-small-businesses-startup.png',
  url: 'https://www.apexpropdesign.com/',
  description:
    'Full Stack Developer with a passion for crafting high-performance web and mobile applications that drive user engagement and business growth. Proven track record in redesigning platforms, streamlining workflows, and solving complex problems to deliver scalable, user-friendly solutions. Skilled in React, Next.js, Node.js, and TypeScript, with a deep focus on real-time systems, clean architecture, and impactful digital transformation.',
  navItems: [
    {
      label: 'Home',
      href: '#home',
    },
    {
      label: 'Skills',
      href: '#skills',
    },
    {
      label: 'Experience',
      href: '#experience',
    },
    {
      label: 'About',
      href: '#about',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Blogs',
      href: '/blogs',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],

  dashboardMenuItems: [
    { name: 'Profile', icon: FaUser, path: '/dashboard' },
    {
      name: 'Skills Management',
      icon: FaLaptopCode,
      path: '/dashboard/skills-management',
    },
    {
      name: 'Projects Management',
      icon: FaProjectDiagram,
      path: '/dashboard/projects-management',
    },
    {
      name: 'Education Management',
      icon: FaGraduationCap,
      path: '/dashboard/education-management',
    },
    {
      name: 'Experience Management',
      icon: FaUser,
      path: '/dashboard/experience-management',
    },
    {
      name: 'Blogs Management',
      icon: FaBlog,
      path: '/dashboard/blogs-management',
    },
    {
      name: 'Home',
      icon: FaHome,
      path: '/',
    },
  ],
  links: {
    github: 'https://github.com/abujobayer0',
    linkedin: 'https://www.linkedin.com/in/abutalhamdjobayer/',
    facebook: 'https://www.facebook.com/abutalhazubayermunna',
    twitter: 'https://x.com/abu_jobaye71370',
    discord: 'https://discord.com/channels/atmjobayer',
    resume: 'https://drive.google.com/file/d/1YIFQMCuGD8NCdpW4XuSH_01Ft9bPh_2V/view?usp=drive_link',
  },
};
