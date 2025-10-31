export type SiteConfig = typeof siteConfig;
import { User, Code2, GraduationCap, FolderKanban, Briefcase, Newspaper, Home } from 'lucide-react';

export const siteConfig = {
  name: 'Abu Talha — Web & Mobile Development',
  ogImage: '/ogImage.jpg',
  url: 'https://www.apexpropdesign.com/',
  description:
    'Full Stack Developer specializing in Next.js, React, React Native, Node.js, and TypeScript. I build SaaS apps, custom dashboards, conversion-focused landing pages, and modern web/mobile experiences that are fast, robust, and SEO-friendly. Strong focus on clean architecture, performance, and shipping business-impacting features quickly.',
  tagline: 'Hire a Next.js/React full-stack developer for SaaS, dashboards, and apps',
  keywords: [
    'Hire full stack developer',
    'Freelance web developer for hire',
    'Custom dashboard development',
    'Next.js React developer',
    'SaaS app developer',
    'Modern landing page design',
    'Affordable web development services',
    'Hire React Native developer',
    'Full-time remote developer hire',
    'Web app development portfolio',
  ],
  longTailKeywords: [
    'hire next.js developer hourly',
    'hire next.js developer monthly',
    'saas mvp developer cost',
    'custom admin dashboard developer',
    'analytics dashboard next.js developer',
    'freelance react native developer rates',
    'remote full stack developer for startup',
    'custom crm development next.js',
    'b2b saas front-end developer',
    'typescript node.js api developer for hire',
  ],
  services: [
    'SaaS MVP development',
    'Admin/analytics dashboard development',
    'Next.js/React front-end engineering',
    'Node.js/TypeScript back-end APIs',
    'React Native mobile apps',
    'Landing page design and development',
    'SEO and performance optimization',
    'Headless CMS (Sanity/Strapi) integrations',
  ],
  contact: {
    email: 'hello@apexpropdesign.com',
    location: 'Remote — Bangladesh (UTC+6) with US/EU overlap',
    availability: 'Open to freelance, contract, and full-time remote roles',
    timezones: ['UTC+6', 'US overlap', 'EU overlap'],
  },
  areasServed: ['Global', 'USA', 'Canada', 'UK', 'EU', 'Australia'],
  industries: ['SaaS', 'E-commerce', 'Fintech', 'Healthcare', 'EdTech', 'Real Estate', 'SMBs'],
  faq: [
    {
      q: 'How much does it cost to hire a Next.js developer?',
      a: 'Hourly from $15 (web) / $20 (mobile). Monthly full-time from $2400. Final pricing depends on scope and timelines.',
    },
    {
      q: 'Do you build SaaS MVPs and dashboards?',
      a: 'Yes. I ship MVPs, custom admin/analytics dashboards, auth, billing, and integrations with a clean, scalable architecture.',
    },
    {
      q: 'Can you work in US/EU time zones?',
      a: 'Yes. I work remotely from UTC+6 with consistent US/EU overlap and clear communication.',
    },
    {
      q: 'What tech stack do you use?',
      a: 'Next.js/React, TypeScript, Node.js, Prisma, PostgreSQL, React Native, Tailwind, Vercel. Headless CMS when needed.',
    },
    {
      q: 'Do you help with performance and SEO?',
      a: 'Absolutely. Lighthouse performance, Core Web Vitals, structured data, canonical URLs, and SEO-friendly content structure.',
    },
  ],
  pricing: {
    currency: 'USD',
    plans: [
      {
        id: 'web-hourly',
        name: 'Web Development',
        type: 'hourly',
        price: 15,
        unit: 'hr',
        features: ['Next.js/React, TypeScript', 'Responsive UI, SEO basics', 'API integration & auth', 'Performance & accessibility'],
        ctaHref: '/contact?service=web&rate=15',
        popular: true,
        badge: 'Popular',
      },
      {
        id: 'mobile-hourly',
        name: 'Mobile App',
        type: 'hourly',
        price: 20,
        unit: 'hr',
        features: ['React Native / Expo', 'iOS & Android builds', 'API, push, analytics', 'Store readiness guidance'],
        ctaHref: '/contact?service=mobile&rate=20',
        popular: false,
      },
      {
        id: 'monthly',
        name: 'Monthly Hire',
        type: 'monthly',
        price: 2400,
        unit: 'mo',
        features: ['Full-stack development', '40 hours/week commitment', 'Priority support & communication', 'Architecture & code reviews'],
        ctaHref: '/contact?service=monthly&rate=2400',
        bestValue: true,
        badge: 'Best Value',
      },
    ],
    notes: 'Rates are indicative; final pricing depends on scope and timeline.',
  },
  navItems: [
    {
      label: 'Home',
      href: '/#home',
    },
    {
      label: 'Skills',
      href: '/#skills',
    },
    {
      label: 'Experience',
      href: '/#experience',
    },
    {
      label: 'About',
      href: '/#about',
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
    { name: 'Profile', icon: User, path: '/dashboard' },
    {
      name: 'Skills Management',
      icon: Code2,
      path: '/dashboard/skills-management',
    },
    {
      name: 'Projects Management',
      icon: FolderKanban,
      path: '/dashboard/projects-management',
    },
    {
      name: 'Education Management',
      icon: GraduationCap,
      path: '/dashboard/education-management',
    },
    {
      name: 'Experience Management',
      icon: Briefcase,
      path: '/dashboard/experience-management',
    },
    {
      name: 'Blogs Management',
      icon: Newspaper,
      path: '/dashboard/blogs-management',
    },
    {
      name: 'Home',
      icon: Home,
      path: '/',
    },
  ],
  links: {
    github: 'https://github.com/abujobayer0',
    linkedin: 'https://www.linkedin.com/in/abutalhamdjobayer/',
    facebook: 'https://www.facebook.com/abutalhazubayermunna',
    twitter: 'https://x.com/ApexPropdesign',
    discord: 'https://discord.com/channels/atmjobayer',
    resume: 'https://drive.google.com/file/d/1YIFQMCuGD8NCdpW4XuSH_01Ft9bPh_2V/view?usp=drive_link',
  },
};
