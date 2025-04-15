'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Butterfly from './butterfly';

export default function LayeredPurpleButterflyLoader() {
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 0.01) % 1);
    }, 20);

    const hoverInterval = setInterval(() => {
      setHover((prev) => prev + 0.02);
    }, 30);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(hoverInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && <Butterfly hover={hover} progress={progress} />}
    </AnimatePresence>
  );
}
