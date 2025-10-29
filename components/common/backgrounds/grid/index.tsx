import React from 'react';

const GridBackgrounds = () => {
  return (
    <div className='absolute inset-0 z-0  w-full'>
      <div className='absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl z-0'></div>
      <div className='absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-warning/20 blur-3xl z-0'></div>

      <div className='absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 opacity-30'>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`cell-${i}`} className='rounded-3xl border border-white/5 backdrop-blur-sm m-4'></div>
        ))}
      </div>

      {/* Animated keyframes */}
      <style jsx>{`
        @keyframes floatDot {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
          }
        }
      `}</style>
    </div>
  );
};

export default GridBackgrounds;
