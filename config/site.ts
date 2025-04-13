export type SiteConfig = typeof siteConfig;
import {
  FaUser,
  FaLaptopCode,
  FaGraduationCap,
  FaProjectDiagram,
  FaBlog,
  FaHome,
} from 'react-icons/fa';

export const siteConfig = {
  name: "Abu Talha's Portfolio",
  ogImage: 'https://demo.jpg',
  url: 'www.abutalhamdjobayer.com',
  description:
    'Junior Full Stack Developer specializing in modern web technologies.',
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
      href: '#projects',
    },
    {
      label: 'Blogs',
      href: '#blogs',
    },
    {
      label: 'Contact',
      href: '#contact',
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
    github: 'https://github.com/Md-Rijwan-Jannat',
    linkedin: 'https://www.linkedin.com/in/md-rijwan-jannat47',
    facebook: 'https://www.facebook.com/mdrijwanjannat',
    twitter: 'https://x.com/JannatRijw51454',
    discord: 'https://discord.com/channels/r.j.rijwan',
    resume:
      'https://drive.google.com/file/d/1YIFQMCuGD8NCdpW4XuSH_01Ft9bPh_2V/view?usp=drive_link',
  },
};
