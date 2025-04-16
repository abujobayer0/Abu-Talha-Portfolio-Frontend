import React from 'react';

const GridBackgrounds = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base Grid */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-warning/20 blur-3xl z-0"></div>

      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 grid-rows-6 opacity-70">
        {Array.from({ length: 12 * 6 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-gray-300/10 relative">
            {/* Highlight points at intersections */}
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-warning/20"></div>
          </div>
        ))}
      </div>

      {/* Horizontal lines with glow effect */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-20">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="h-px w-full bg-gradient-to-r from-transparent via-warning/40 to-transparent"
            style={{
              transform: `translateY(${(i * 100) / 6}%)`,
            }}
          ></div>
        ))}
      </div>

      {/* Vertical lines with glow effect */}
      <div className="absolute inset-0 flex flex-row justify-between opacity-20">
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="w-px h-full bg-gradient-to-b from-transparent via-purple-500/40 to-transparent"
            style={{
              transform: `translateX(${(i * 100) / 12}%)`,
            }}
          ></div>
        ))}
      </div>

      {/* Animated floating dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1.5 h-1.5 bg-warning rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatDot ${4 + Math.random() * 8}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          ></div>
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`purpleDot-${i}`}
            className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatDot ${4 + Math.random() * 8}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Grid overlay with blur for depth */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={`cell-${i}`}
            className="rounded-3xl border border-white/5 backdrop-blur-sm m-4"
          ></div>
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
            transform: translate(
              ${Math.random() * 20 - 10}px,
              ${Math.random() * 20 - 10}px
            );
          }
        }
      `}</style>
    </div>
  );
};

export default GridBackgrounds;
