'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';
import DemoCallPopup, { DemoCallPopupHandle } from './demoCallPopup';

const FloatingMessageButton = () => {
  const popupRef = useRef<DemoCallPopupHandle>(null);

  const handleClick = () => {
    popupRef.current?.open();
  };

  return (
    <>
      <motion.div
        className='fixed bottom-6 right-6 z-40 flex items-center gap-3'
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Tooltip text */}
        <motion.div
          className='hidden sm:block bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap'
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3, duration: 0.3 }}
        >
          Discovery Call
          {/* Tooltip arrow */}
          <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-full'>
            <div className='w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-gray-900 dark:border-l-gray-800 border-b-8 border-b-transparent'></div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={handleClick}
          className='relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label='Open discovery call popup'
        >
          <FaComments className='w-6 h-6' />
          {/* Pulse animation ring */}
          <span className='absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20'></span>
        </motion.button>
      </motion.div>
      <DemoCallPopup ref={popupRef} />
    </>
  );
};

export default FloatingMessageButton;
