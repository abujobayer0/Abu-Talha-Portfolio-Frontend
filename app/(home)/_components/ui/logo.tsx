'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const logoVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
};

const letterVariants = {
  initial: { y: 0 },
  whileHover: (i: number) => ({
    y: [-1, -2, -2.5, 0.5, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 1],
      delay: i * 0.05,
    },
  }),
};

export default function Logo() {
  return (
    <Link href="/">
      <motion.p
        whileHover={{
          color: 'white',
          textShadow: '0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff',
          transition: { duration: 0.3 },
        }}
      >
        Abu Talha
      </motion.p>
    </Link>
  );
}
