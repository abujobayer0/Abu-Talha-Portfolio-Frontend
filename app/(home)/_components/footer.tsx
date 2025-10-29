'use client';

import NavButtons from './ui/navButtons';
import { siteConfig } from '@/config/site';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function Footer() {
  const router = useRouter();
  const handleLinkClick = () => {
    router.push('/');
  };

  return (
    <footer>
      <div className='max-w-6xl mx-auto px-4 py-10 md:py-16'>
        {/* Business CTA Banner */}
        <div className='mb-10 rounded-2xl border border-default-200 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <div>
            <h3 className='text-xl md:text-2xl font-semibold text-default-900'>Let’s build your next product</h3>
            <p className='text-sm text-default-600 mt-1'>Have a project in mind? I can help you ship faster and de-risk delivery.</p>
          </div>
          <div>
            <a
              href='/contact'
              className='inline-flex items-center justify-center rounded-full bg-warning text-gray-900 font-semibold px-6 py-3 hover:opacity-90 transition'
            >
              Hire Me
            </a>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='flex flex-col space-y-4'>
            <h3 className='text-lg font-semibold text-default-800'>About Me</h3>
            <p className='text-sm text-default-600'>
              I am a results-driven developer crafting innovative, high-impact solutions. My portfolio highlights projects that combine
              cutting-edge web development, intuitive design, and business-focused functionality to help organizations streamline operations
              and achieve measurable growth.
            </p>
          </div>
          <div className='flex flex-col space-y-4'>
            <h3 className='text-lg font-semibold text-default-800'>Quick Links</h3>
            <nav className='flex flex-col space-y-2'>
              {siteConfig.navItems.slice(0, 4).map((item) => (
                <div key={item.href}>
                  <ScrollLink
                    className={clsx('cursor-pointer text-default-900 hover:text-warning')}
                    color='black'
                    duration={500}
                    offset={-90}
                    smooth={true}
                    to={item.href.substring(1)}
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </ScrollLink>
                </div>
              ))}
            </nav>
          </div>
          <div className='flex flex-col space-y-4'>
            <h3 className='text-lg font-semibold text-default-800'>Connect</h3>
            <NavButtons />
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-default-200'>
          <p className='text-sm text-center text-default-600'>© {new Date().getFullYear()} Abu Talha Md Jobayer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
