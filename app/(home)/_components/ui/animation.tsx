export const buttonVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
  whileHover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
  whileTap: { scale: 0.95, rotate: 0, transition: { duration: 0.2 } },
};

// Motion variants for animations
export const linkVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  whileHover: { scale: 1.1, color: '#9333ea', transition: { duration: 0.2 } }, // Scale on hover with color change
};

export const textVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  whileHover: { color: '#9333ea', transition: { duration: 0.3 } },
};

export const menuVariants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};
