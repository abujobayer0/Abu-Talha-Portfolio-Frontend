'use client';

import React, { ReactNode } from 'react';
import Footer from '../(home)/_components/footer';
import { Navbar } from '../(home)/_components/ui/navbar';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className='space-y-5 pt-4 px-2'>
      <Navbar activeSection='projects' />
      <div className='space-y-12 md:space-y-16'>
        <div className='pt-4 min-h-[70vh]'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
