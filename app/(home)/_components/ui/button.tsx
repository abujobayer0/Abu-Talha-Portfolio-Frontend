'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { IoDownload } from 'react-icons/io5';

interface AnimatedButtonProps {
  href: string;
  text: string;
  IconComponent?: React.ComponentType;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  shadowColor?: string;
  target?: '_self' | '_blank';
  rel?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  text,
  IconComponent = IoDownload,
  bgColor = 'bg-white',
  textColor = 'text-black',
  borderColor = 'border-default-200',
  shadowColor = 'shadow-md',
  target = '_blank',
  rel = 'noopener noreferrer',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 1 } },
  };

  const pulseVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { scale: 1.5, opacity: 0 },
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start('hover');
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start('initial');
  };

  const handleTap = () => {
    controls.start('tap');
  };

  return (
    <div className="my-2 flex items-center justify-center">
      <motion.div
        className="relative"
        initial="initial"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onHoverEnd={handleHoverEnd}
        onHoverStart={handleHoverStart}
        onTapStart={handleTap}
      >
        <Link
          className={`flex items-center gap-2 border whitespace-nowrap ${borderColor} rounded-full px-4 py-2 ${bgColor} ${textColor} font-medium ${shadowColor} hover:shadow-lg transition-shadow duration-300`}
          href={href}
          target={target}
          rel={rel}
        >
          <motion.span variants={iconVariants}>
            {IconComponent && <IconComponent className="text-xl" />}
          </motion.span>
          {text}
        </Link>
      </motion.div>
    </div>
  );
};

export default AnimatedButton;
