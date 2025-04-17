import { motion } from 'framer-motion';
import { Code, Database, Layout, Globe, Brain, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function SkewedCardWithSideLineIcons() {
  const profileImageUrl = 'https://i.ibb.co.com/VcxxPJLL/IMG-0052.jpg';
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const sideIcons = [
    { Icon: Code, label: 'Code' },
    { Icon: Database, label: 'Database' },
    { Icon: Layout, label: 'Layout' },
    { Icon: Globe, label: 'Web' },
    { Icon: Brain, label: 'AI' },
    { Icon: Sparkles, label: 'Creative' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center font-serif bg-amber-50 dark:bg-black">
      <motion.div
        className="relative h-96 w-80 skew-x-3 rounded-xl border-2 border-purple-500 bg-white dark:bg-gray-900 shadow-md hover:scale-105 transition-transform duration-500"
        whileHover={{ scale: 1.05 }}
        initial={{ borderColor: 'transparent' }}
        animate={{
          borderColor: ['#9333ea', '#a78bfa', '#c4b5fd', '#9333ea'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <motion.img
          src={profileImageUrl}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />

        <div className="absolute top-1/2 right-[-45px] -translate-y-1/2 flex flex-col items-center space-y-4 z-20">
          {sideIcons.map(({ Icon, label }, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 + 0.5, duration: 0.4 }}
              onHoverStart={() => setHoveredIcon(idx as any)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <motion.div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md text-white shadow-sm group-hover:shadow-md transition"
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </motion.div>

              {/* Label Tooltip */}
              <motion.p
                className="absolute left-full ml-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs whitespace-nowrap"
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={
                  hoveredIcon === idx
                    ? { opacity: 1, x: 0, scale: 1 }
                    : { opacity: 0, x: -10, scale: 0.8 }
                }
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
