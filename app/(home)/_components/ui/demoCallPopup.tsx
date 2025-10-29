'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button } from '@nextui-org/react';
import { FaEnvelope, FaTimes, FaUser, FaClock, FaShieldAlt, FaRocket } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import { FileText, Map, Lightbulb, DollarSign } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';

import { useGetAllAbout } from '@/hooks/about.hook';

export interface DemoCallPopupHandle {
  open: () => void;
}

const DemoCallPopup = forwardRef<DemoCallPopupHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: aboutData, isLoading } = useGetAllAbout();

  const profileImage = (!isLoading && aboutData?.data[0]?.image) || 'https://i.ibb.co.com/yFgLxsCX/IMG-6807.jpg';
  const profileName = (!isLoading && aboutData?.data[0]?.me?.name) || 'Abu Talha';

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if popup has been shown before (using sessionStorage)
    const hasSeenPopup = sessionStorage.getItem('demo-call-popup-seen');

    // Show popup after 5 seconds if not seen before
    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const emailValidation = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrMsg('Please enter your name');
      return;
    }

    if (!email.trim()) {
      setErrMsg('Please enter your email');
      return;
    }

    if (!emailValidation(email)) {
      setErrMsg('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate a delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const emailParams = {
        name: name,
        email: email,
        message: `Demo Call Request from ${name} (${email})`,
        time: new Date().toLocaleString(),
        title: 'Demo Call Request',
      };

      await emailjs.send('service_hc9j2be', 'template_5qtq5wa', emailParams, 'EKumPNPEupZ1Kc9zQ');

      // Twitter conversion tracking event
      if (typeof window !== 'undefined' && (window as any).twq) {
        (window as any).twq('event', 'tw-qg619-qg619', {
          email_address: emailParams.email,
          name: emailParams.name,
          content_name: 'Demo Call Request',
          content_category: 'Demo Call',
        });
      }

      setSuccessMsg(
        `Thank you, ${name}! Your discovery call request has been received. I'll respond within 24 hours (PST) to schedule our call.`
      );

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('demo-call-popup-seen', 'true');
      }

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setEmail('');
        setName('');
      }, 3000);
    } catch (error) {
      setErrMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('demo-call-popup-seen', 'true');
    }
  };

  const open = () => {
    setIsOpen(true);
  };

  // Expose open function via ref
  useImperativeHandle(ref, () => ({
    open,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative w-full max-w-2xl'>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className='absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-gray-900/90 hover:bg-gray-800 border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-xl backdrop-blur-sm'
                aria-label='Close popup'
              >
                <FaTimes className='w-4 h-4' />
              </button>

              {/* Popup Content */}
              <div className='bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden'>
                {/* Compact Premium Header */}
                <div className='relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 px-6 py-5 text-white'>
                  <div className='flex items-center gap-4'>
                    <div className='relative w-14 h-14 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0'>
                      <Image src={profileImage} alt={profileName} fill className='object-cover' priority />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-lg font-bold tracking-tight mb-0.5'>{profileName}</h3>
                      <p className='text-xs text-slate-300'>Full Stack Engineer</p>
                    </div>
                    <div className='hidden sm:flex items-center gap-3 text-xs'>
                      <div className='text-center'>
                        <div className='font-bold'>30+</div>
                        <div className='text-slate-400'>Apps</div>
                      </div>
                      <div className='text-center'>
                        <div className='font-bold'>&lt;200ms</div>
                        <div className='text-slate-400'>P95</div>
                      </div>
                      <div className='text-center'>
                        <div className='font-bold'>99.9%</div>
                        <div className='text-slate-400'>Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Content */}
                <div className='p-6'>
                  {/* Condensed Value Proposition */}
                  <div className='mb-5'>
                    <div className='inline-flex items-center gap-2 px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-3'>
                      <FaRocket className='text-purple-600 dark:text-purple-400' size={11} />
                      <span className='text-xs font-semibold text-purple-700 dark:text-purple-300'>DISCOVERY CALL</span>
                    </div>

                    <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight'>
                      Share Your Idea. Get a Complete Proposal.
                    </h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-0 leading-relaxed'>
                      Let's discuss your project vision. I'll provide a detailed proposal with technical roadmap, strategies, and
                      transparent pricing—all tailored to your needs.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className='space-y-3'>
                    {errMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='py-3 px-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-200 text-sm'
                      >
                        <MdError size={18} />
                        <p>{errMsg}</p>
                      </motion.div>
                    )}

                    {successMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='py-3 px-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2 text-green-200 text-sm'
                      >
                        <BsCheckCircleFill size={18} />
                        <p>{successMsg}</p>
                      </motion.div>
                    )}

                    <div className='space-y-3'>
                      <Input
                        fullWidth
                        label='Name'
                        name='name'
                        value={name}
                        placeholder='John Smith'
                        variant='bordered'
                        radius='lg'
                        size='md'
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrMsg(null);
                        }}
                        classNames={{
                          label: 'text-gray-700 dark:text-gray-300 font-semibold text-sm',
                          input: 'text-gray-900 dark:text-white',
                          inputWrapper:
                            'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 focus-within:border-purple-600 dark:focus-within:border-purple-500 transition-colors',
                        }}
                        startContent={<FaUser className='text-gray-400' size={14} />}
                        isRequired
                        isDisabled={isSubmitting || !!successMsg}
                      />

                      <Input
                        fullWidth
                        label='Work Email'
                        name='email'
                        type='email'
                        value={email}
                        placeholder='john@company.com'
                        variant='bordered'
                        radius='lg'
                        size='md'
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrMsg(null);
                        }}
                        classNames={{
                          label: 'text-gray-700 dark:text-gray-300 font-semibold text-sm',
                          input: 'text-gray-900 dark:text-white',
                          inputWrapper:
                            'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 focus-within:border-purple-600 dark:focus-within:border-purple-500 transition-colors',
                        }}
                        startContent={<FaEnvelope className='text-gray-400' size={14} />}
                        isRequired
                        isDisabled={isSubmitting || !!successMsg}
                      />
                    </div>

                    {/* Security & Privacy - Compact */}
                    <div className='flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400'>
                      <FaShieldAlt size={10} />
                      <span>Enterprise-grade security • GDPR compliant</span>
                    </div>

                    <Button
                      type='submit'
                      className='w-full bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 hover:from-slate-800 hover:via-purple-800 hover:to-indigo-800 text-white font-semibold py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
                      isLoading={isSubmitting}
                      isDisabled={!!successMsg}
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : successMsg ? (
                        '✓ Request Submitted'
                      ) : (
                        <span className='flex items-center justify-center gap-2'>
                          <FaRocket size={13} />
                          Schedule Discovery Call
                        </span>
                      )}
                    </Button>

                    {/* Compact Expectations */}
                    <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-800'>
                      <div className='flex items-start gap-2'>
                        <div className='flex-1'>
                          <div className='flex gap-2'>
                            <FaClock className='text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0' size={12} />
                            <p className='font-medium text-gray-900 dark:text-white text-xs mb-1'>
                              After our discovery call, you'll receive:
                            </p>
                          </div>
                          <div className='flex flex-wrap items-center gap-3 mt-2'>
                            <div className='flex items-center gap-1.5'>
                              <FileText className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' />
                              <span className='text-xs text-gray-600 dark:text-gray-400'>Proposal</span>
                            </div>
                            <span className='text-gray-400'>•</span>
                            <div className='flex items-center gap-1.5'>
                              <Map className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' />
                              <span className='text-xs text-gray-600 dark:text-gray-400'>Technical Roadmap</span>
                            </div>
                            <span className='text-gray-400'>•</span>
                            <div className='flex items-center gap-1.5'>
                              <Lightbulb className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' />
                              <span className='text-xs text-gray-600 dark:text-gray-400'>Strategies</span>
                            </div>
                            <span className='text-gray-400'>•</span>
                            <div className='flex items-center gap-1.5'>
                              <DollarSign className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' />
                              <span className='text-xs text-gray-600 dark:text-gray-400'>Transparent Quote</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

DemoCallPopup.displayName = 'DemoCallPopup';

export default DemoCallPopup;
