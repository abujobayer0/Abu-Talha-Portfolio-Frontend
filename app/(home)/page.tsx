import React from 'react';
import Landing from './_components/landing';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export default function Home() {
  return (
    <div>
      <Landing />
    </div>
  );
}
