'use client';
import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.01;
        return newProgress >= 1 ? 1 : newProgress;
      });
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[360px] bg-black rounded-lg shadow-md relative overflow-hidden">
      <div className="z-10 flex flex-col items-center">
        <div className="relative w-16 h-16 mb-6">
          <div className="w-48 h-1.5 bg-[#3b0764] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #c4b5fd, #9333ea, #6b21a8)',
              }}
            ></div>
          </div>
          <p className="text-xs text-[#a78bfa] mt-2">
            {Math.round(progress * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}
