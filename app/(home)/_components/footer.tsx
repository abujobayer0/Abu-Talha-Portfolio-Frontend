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
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-default-800">About Me</h3>
            <p className="text-sm text-default-600">
              I am a passionate developer creating innovative solutions. My
              portfolio showcases my projects and skills in web development and
              design.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-default-800">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {siteConfig.navItems.slice(0, 4).map((item) => (
                <div key={item.href}>
                  <ScrollLink
                    className={clsx(
                      'cursor-pointer text-default-900 hover:text-warning'
                    )}
                    color="black"
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
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-default-800">Connect</h3>
            <NavButtons />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-default-200">
          <p className="text-sm text-center text-default-600">
            © {new Date().getFullYear()} Abu Talha Md Jobayer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
