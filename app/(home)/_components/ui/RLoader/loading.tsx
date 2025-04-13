'use client';
import React from 'react';
import { useState, useEffect } from 'react';

export default function LayeredPurpleButterflyLoader() {
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 0.01) % 1);
    }, 20);

    const hoverInterval = setInterval(() => {
      setHover((prev) => prev + 0.02);
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(hoverInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[60px] bg-[#9333ea] blur-[150px] transform rotate-45" />
      </div>
      <div
        className="relative w-72 h-72 z-10"
        style={{
          transform: `translateY(${Math.sin(hover) * 10}px)`,
        }}
      >
        <div className="shape-container relative w-full h-full">
          <div className="shape butterfly">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Left bottom wing - Layer 1 (Base) */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C40,80 0,120 10,170 C25,190 70,190 100,110 Z"
                  fill="#581c87" // 800
                />
              </g>

              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C45,85 10,120 20,165 C30,180 65,180 100,110 Z"
                  fill="#6b21a8" // 700
                />
              </g>

              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C50,90 20,120 30,160 C40,170 60,170 100,110 Z"
                  fill="#7e22ce" // 600
                />
              </g>

              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C60,95 35,120 40,150 C55,160 75,150 100,110 Z"
                  fill="#9333ea" // 500 (main)
                />
                <path
                  d="M100,70 C75,95 50,120 55,145 C65,150 80,140 100,110 Z"
                  fill="#a78bfa" // 400
                  opacity="0.6"
                />
                <circle cx="60" cy="120" r="8" fill="#c4b5fd" opacity="0.7" />{' '}
                // 300
                <circle
                  cx="40"
                  cy="140"
                  r="6"
                  fill="#ddd6fe"
                  opacity="0.7"
                />{' '}
                // 200
                <circle
                  cx="75"
                  cy="100"
                  r="5"
                  fill="#ede9fe"
                  opacity="0.7"
                />{' '}
                // 100
                <path
                  d="M55,110 C60,115 70,120 60,125"
                  stroke="#f5f3ff" // 50
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"
                />
              </g>

              {/* Right bottom wing - Layer 1 (Base) */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C160,80 200,120 190,170 C175,190 130,190 100,110 Z"
                  fill="#581c87" // 800
                />
              </g>

              {/* Right bottom wing - Layer 2 */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C155,85 190,120 180,165 C170,180 135,180 100,110 Z"
                  fill="#6b21a8" // 700
                />
              </g>

              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C150,90 180,120 170,160 C160,170 140,170 100,110 Z"
                  fill="#7e22ce" // 600
                />
              </g>

              {/* Right bottom wing - Layer 4 (Top) */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -40}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C140,95 165,120 160,150 C145,160 125,150 100,110 Z"
                  fill="#9333ea" // 500 (main)
                />
                <path
                  d="M100,70 C125,95 150,120 145,145 C135,150 120,140 100,110 Z"
                  fill="#a78bfa" // 400
                  opacity="0.6"
                />
                <circle cx="140" cy="120" r="8" fill="#c4b5fd" opacity="0.7" />{' '}
                // 300
                <circle
                  cx="160"
                  cy="140"
                  r="6"
                  fill="#ddd6fe"
                  opacity="0.7"
                />{' '}
                // 200
                <circle
                  cx="125"
                  cy="100"
                  r="5"
                  fill="#ede9fe"
                  opacity="0.7"
                />{' '}
                // 100
                <path
                  d="M145,110 C140,115 130,120 140,125"
                  stroke="#f5f3ff" // 50
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"
                />
              </g>

              {/* Left top wing - Layer 1 (Base) */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C70,40 20,20 10,50 C0,80 35,100 100,100 Z"
                  fill="#3b0764" // 900 (darkest)
                />
              </g>

              {/* Left top wing - Layer 2 */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C70,42 25,25 15,50 C5,80 40,98 100,100 Z"
                  fill="#581c87" // 800
                />
              </g>

              {/* Left top wing - Layer 3 */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C72,45 30,30 25,55 C15,80 45,95 100,100 Z"
                  fill="#6b21a8" // 700
                />
              </g>

              {/* Left top wing - Layer 4 (Top) */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * 35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C75,48 40,35 35,60 C30,85 50,92 100,100 Z"
                  fill="#7e22ce" // 600
                />
                <path
                  d="M100,70 C80,50 50,40 45,65 C45,85 65,90 100,100 Z"
                  fill="#9333ea" // 500 (main)
                  opacity="0.8"
                />
                <circle cx="60" cy="60" r="6" fill="#a78bfa" opacity="0.7" /> //
                400
                <circle cx="40" cy="70" r="4" fill="#c4b5fd" opacity="0.7" /> //
                300
                <circle cx="70" cy="45" r="3" fill="#ddd6fe" opacity="0.7" /> //
                200
                <path
                  d="M50,65 C55,60 65,55 55,50"
                  stroke="#ede9fe" // 100
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
              </g>

              {/* Right top wing - Layer 1 (Base) */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C130,40 180,20 190,50 C200,80 165,100 100,100 Z"
                  fill="#3b0764" // 900 (darkest)
                />
              </g>

              {/* Right top wing - Layer 2 */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C130,42 175,25 185,50 C195,80 160,98 100,100 Z"
                  fill="#581c87" // 800
                />
              </g>

              {/* Right top wing - Layer 3 */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C128,45 170,30 175,55 C185,80 155,95 100,100 Z"
                  fill="#6b21a8" // 700
                />
              </g>

              {/* Right top wing - Layer 4 (Top) */}
              <g
                className="butterfly__wing"
                style={{
                  transform: `rotateY(${Math.sin(progress * Math.PI * 2) * -35}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <path
                  d="M100,70 C125,48 160,35 165,60 C170,85 150,92 100,100 Z"
                  fill="#7e22ce" // 600
                />
                <path
                  d="M100,70 C120,50 150,40 155,65 C155,85 135,90 100,100 Z"
                  fill="#9333ea" // 500 (main)
                  opacity="0.8"
                />
                <circle cx="140" cy="60" r="6" fill="#a78bfa" opacity="0.7" />{' '}
                // 400
                <circle
                  cx="160"
                  cy="70"
                  r="4"
                  fill="#c4b5fd"
                  opacity="0.7"
                />{' '}
                // 300
                <circle
                  cx="130"
                  cy="45"
                  r="3"
                  fill="#ddd6fe"
                  opacity="0.7"
                />{' '}
                // 200
                <path
                  d="M150,65 C145,60 135,55 145,50"
                  stroke="#ede9fe" // 100
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
              </g>

              {/* Body - Layer 1 (Base) */}
              <g className="butterfly__body">
                <path
                  d="M97,70 Q100,64 103,70 L103,125 Q100,132 97,125 Z"
                  fill="#3b0764" // 900 (darkest)
                />
              </g>

              {/* Body - Layer 2 */}
              <g className="butterfly__body">
                <path
                  d="M97.5,70 Q100,65 102.5,70 L102.5,123 Q100,129 97.5,123 Z"
                  fill="#581c87" // 800
                />
              </g>

              {/* Body - Layer 3 */}
              <g className="butterfly__body">
                <path
                  d="M98,70 Q100,66 102,70 L102,121 Q100,126 98,121 Z"
                  fill="#6b21a8" // 700
                />
              </g>

              {/* Body - Layer 4 (Top) */}
              <g className="butterfly__body">
                <path
                  d="M98.5,70 Q100,67 101.5,70 L101.5,118 Q100,122 98.5,118 Z"
                  fill="#7e22ce" // 600
                />
                <ellipse cx="100" cy="68" rx="5" ry="6" fill="#9333ea" /> // 500
                (main)
                <path d="M97,65 L93,50" stroke="#9333ea" strokeWidth="1.5" /> //
                500 (main)
                <path
                  d="M103,65 L107,50"
                  stroke="#9333ea"
                  strokeWidth="1.5"
                />{' '}
                // 500 (main)
                <circle cx="93" cy="50" r="2" fill="#a78bfa" /> // 400
                <circle cx="107" cy="50" r="2" fill="#a78bfa" /> // 400
                {/* Small decorative details on body */}
                <circle cx="100" cy="80" r="1.2" fill="#c4b5fd" /> // 300
                <circle cx="100" cy="90" r="1.2" fill="#c4b5fd" /> // 300
                <circle cx="100" cy="100" r="1.2" fill="#c4b5fd" /> // 300
                <circle cx="100" cy="110" r="1.2" fill="#c4b5fd" /> // 300
              </g>

              {/* Shimmering dots on wings */}
              {[...Array(40)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 20;
                const distance = 30 + (i % 5) * 10;
                const xPos = 100 + Math.cos(angle) * distance;
                const yPos = 90 + Math.sin(angle) * distance;
                const opacity =
                  0.3 + Math.sin(progress * Math.PI * 2 + i * 0.2) * 0.3;
                const size = 0.8 + Math.sin(progress * Math.PI * 4 + i) * 0.4;

                return (
                  <circle
                    key={i}
                    cx={xPos}
                    cy={yPos}
                    r={size}
                    fill="#f5f3ff" // 50 (lightest)
                    opacity={opacity}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Animated particles around the butterfly */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${50 + Math.sin(hover + i * 0.5) * 40}%`,
              left: `${50 + Math.cos(hover + i * 0.5) * 40}%`,
              opacity: 0.3 + Math.sin(progress * Math.PI * 2 + i) * 0.3,
              transform: `scale(${0.8 + Math.sin(progress * Math.PI * 4 + i) * 0.5})`,
              background:
                i % 3 === 0
                  ? '#c4b5fd' // 300
                  : i % 3 === 1
                    ? '#a78bfa' // 400
                    : '#9333ea', // 500 (main)
              boxShadow: '0 0 8px 2px rgba(165, 180, 252, 0.3)',
            }}
          ></div>
        ))}

        {/* Loading text with animated dots */}
        <div className="absolute bottom-0 left-0 w-full text-center">
          <p className="text-base font-medium text-purple-200">
            <span className="tracking-widest uppercase text-ddd6fe">
              Loading
            </span>
            <span
              style={{
                opacity: Math.sin(progress * Math.PI * 10) > 0.3 ? 1 : 0,
              }}
            >
              .
            </span>
            <span
              style={{
                opacity: Math.sin(progress * Math.PI * 10 + 1) > 0.3 ? 1 : 0,
              }}
            >
              .
            </span>
            <span
              style={{
                opacity: Math.sin(progress * Math.PI * 10 + 2) > 0.3 ? 1 : 0,
              }}
            >
              .
            </span>
          </p>

          {/* Progress bar */}
          <div className="mt-2 mx-auto w-40 h-1 bg-purple-900 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #c4b5fd, #9333ea, #6b21a8)',
              }}
            />
          </div>
        </div>

        {/* Glowing halo effect */}
        <div
          className="absolute top-1/2 left-1/2 w-40 h-10 rounded-full blur-xl -z-10"
          style={{
            background: 'rgba(147, 51, 234, 0.2)',
            transform: `translate(-50%, 100%) scale(${1 + Math.sin(progress * Math.PI * 4) * 0.2})`,
            opacity: 0.4 + Math.sin(progress * Math.PI * 2) * 0.2,
          }}
        ></div>
      </div>
    </div>
  );
}
