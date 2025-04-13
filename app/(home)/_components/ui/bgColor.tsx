import React from 'react';

export default function BgColor() {
  return (
    <div className="absolute inset-0">
      <div className="w-[200px] md:w-[300px] h-[500px] bg-[#9333ea] opacity-70 blur-[120px] absolute top-10 left-20" />
      <div className="w-[200px] md:w-[300px] h-[500px] bg-blue-300 opacity-70 blur-[120px] absolute bottom-10 right-20" />
    </div>
  );
}
