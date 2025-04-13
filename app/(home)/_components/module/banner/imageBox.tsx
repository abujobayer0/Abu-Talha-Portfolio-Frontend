'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Image.module.css';

interface BoxProps {
  imageUrl: string;
  name: string;
  title: string;
  link: string;
}

const underlineVariants = {
  initial: { width: 0 },
  whileHover: {
    width: '100%',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const ImageBox: React.FC<BoxProps> = ({ imageUrl, name, title, link }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.content}>
          <Image
            src={imageUrl}
            alt={name}
            className={styles.img}
            width={300}
            height={300}
          />
          <h2>
            {name}
            <span>{title}</span>
          </h2>
          <motion.div
            initial="initial"
            whileHover="whileHover"
            className="relative cursor-pointer"
          >
            <motion.a
              href={link}
              className={styles.hireLink}
              whileHover={{
                color: 'white',
                textShadow: '0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff',
                transition: { duration: 0.3 },
              }}
            >
              Hire Me
            </motion.a>

            <motion.div
              className={styles.glowingUnderline}
              variants={underlineVariants}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
