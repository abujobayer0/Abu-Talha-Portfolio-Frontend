import React, { ReactNode } from 'react';

interface TContainerProps {
  children: ReactNode;
}

export default function Container({ children }: TContainerProps) {
  return <main className='container mx-auto max-w-7xl flex-grow z-10'>{children}</main>;
}
