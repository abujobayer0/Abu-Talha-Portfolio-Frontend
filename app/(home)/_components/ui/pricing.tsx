'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';
import GridBackgrounds from '@/components/common/backgrounds/grid';
import { Title } from './title';
import ElectricBorder from '../ElectricBorder';

function PriceTag({ amount, suffix = '/hr' }: { amount: string; suffix?: string }) {
  return (
    <div className='flex items-end gap-1 text-4xl md:text-5xl font-extrabold tracking-tight text-purple-800 dark:text-purple-200'>
      <span>{amount}</span>
      <span className='text-purple-600 dark:text-purple-300 text-base md:text-lg mb-1'>{suffix}</span>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function PricingSection() {
  const pricing = siteConfig.pricing;
  const currencySymbol = pricing?.currency === 'USD' ? '$' : '';
  const plans = pricing?.plans ?? [];
  const offersJsonLd = plans.map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: p.price,
    priceCurrency: pricing?.currency || 'USD',
    category: p.type,
    url: `${siteConfig.url.replace(/\/$/, '')}${p.ctaHref}`,
    availability: 'https://schema.org/InStock',
  }));
  return (
    <section id='pricing' aria-labelledby='pricing-heading' className='py-12 relative'>
      <GridBackgrounds />
      <div className='container mx-auto px-4 relative z-10'>
        <Title title1='Pricing' title2='Hire Me' />
        <p className='mt-2 text-center text-gray-400 max-w-2xl mx-auto'>
          Transparent hourly rates and best-value monthly option. {pricing?.notes}
        </p>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'AggregateOffer', offers: offersJsonLd }),
          }}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
          {/* Web Development */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className='group relative cursor-pointer'
          >
            <div className='group relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300 p-6 md:p-8'>
              {/* Animated glow background on hover */}
              <motion.div
                className='absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                style={{
                  background: 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
                }}
              />

              <div className='relative z-10'>
                <div className='mb-3 flex items-center gap-2'>
                  <span className='text-sm font-medium uppercase tracking-wide text-purple-900/80 dark:text-purple-200'>
                    Web Development
                  </span>
                  <span className='rounded-full  bg-purple-100/50 px-2 py-0.5 text-[10px] font-semibold text-purple-50 border border-purple-400/30 backdrop-blur-md'>
                    Hourly
                  </span>
                  <span className='rounded-full bg-warning/90 px-2 py-0.5 text-[10px] font-semibold text-gray-50'>Popular</span>
                </div>
                <PriceTag amount={`${currencySymbol}${plans.find((p) => p.id === 'web-hourly')?.price ?? 15}`} />
                <ul className='mt-4 space-y-2 text-sm text-purple-900 dark:text-purple-200'>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Next.js/React, TypeScript
                  </li>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Responsive UI, SEO basics
                  </li>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    API integration & auth
                  </li>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Performance & accessibility
                  </li>
                </ul>
                <div className='mt-6'>
                  <Link
                    href={plans.find((p) => p.id === 'web-hourly')?.ctaHref || '/contact?service=web&rate=15'}
                    className='inline-flex items-center justify-center rounded-full bg-warning text-gray-50 font-semibold px-5 py-3 hover:opacity-90 transition'
                  >
                    Hire for Web
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile App */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className='group relative cursor-pointer'
          >
            <div className='group relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300 p-6 md:p-8'>
              {/* Animated glow background on hover */}
              <motion.div
                className='absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                style={{
                  background: 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
                }}
              />

              <div className='relative z-10'>
                <div className='mb-3 flex items-center gap-2'>
                  <span className='text-sm font-medium uppercase tracking-wide text-purple-900/80 dark:text-purple-200'>Mobile App</span>
                  <span className='rounded-full bg-purple-100/50 px-2 py-0.5 text-[10px] font-semibold text-purple-50 border border-purple-400/30 backdrop-blur-md'>
                    Hourly
                  </span>
                </div>
                <PriceTag amount={`${currencySymbol}${plans.find((p) => p.id === 'mobile-hourly')?.price ?? 20}`} />
                <ul className='mt-4 space-y-2 text-sm text-purple-900 dark:text-purple-200'>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    React Native / Expo
                  </li>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    iOS & Android builds
                  </li>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    API, push, analytics
                  </li>
                  <li className='flex items-center gap-2'>
                    <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Store readiness guidance
                  </li>
                </ul>
                <div className='mt-6'>
                  <Link
                    href={plans.find((p) => p.id === 'mobile-hourly')?.ctaHref || '/contact?service=mobile&rate=20'}
                    className='inline-flex items-center justify-center rounded-full border border-purple-400/30 text-purple-900 dark:text-purple-50 font-semibold px-5 py-3 bg-white/30 hover:bg-white/40 transition'
                  >
                    Hire for Mobile
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          <ElectricBorder color='#ff0080' speed={0.5} chaos={5} thickness={2}>
            {/* Monthly Hire */}
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className='group relative cursor-pointer'
            >
              <div className='group relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-purple-300/30 hover:ring-2 hover:ring-purple-400/50 transition-all duration-300 p-6 md:p-8'>
                {/* Animated glow background on hover */}
                <motion.div
                  className='absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.1), transparent)',
                  }}
                />

                <div className='relative z-10'>
                  <div className='mb-3 flex items-center gap-2'>
                    <span className='text-sm font-medium uppercase tracking-wide text-purple-900/80 dark:text-purple-200'>
                      Monthly Hire
                    </span>
                    <span className='rounded-full bg-purple-100/50 px-2 py-0.5 text-[10px] font-semibold text-purple-50 border border-purple-400/30 backdrop-blur-md'>
                      Full-time
                    </span>
                    <span className='rounded-full bg-green-500/90 px-2 py-0.5 text-[10px] font-semibold text-gray-50'>Best Value</span>
                  </div>
                  <PriceTag amount={`${currencySymbol}${plans.find((p) => p.id === 'monthly')?.price ?? 2400}`} suffix='/mo' />
                  <ul className='mt-4 space-y-2 text-sm text-purple-900 dark:text-purple-200'>
                    <li className='flex items-center gap-2'>
                      <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Full-stack development
                    </li>
                    <li className='flex items-center gap-2'>
                      <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                          clipRule='evenodd'
                        />
                      </svg>
                      40 hours/week commitment
                    </li>
                    <li className='flex items-center gap-2'>
                      <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Priority support & communication
                    </li>
                    <li className='flex items-center gap-2'>
                      <svg className='h-4 w-4 text-warning' viewBox='0 0 20 20' fill='currentColor'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Architecture & code reviews
                    </li>
                  </ul>
                  <div className='mt-6'>
                    <Link
                      href={plans.find((p) => p.id === 'monthly')?.ctaHref || '/contact?service=monthly&rate=2400'}
                      className='inline-flex items-center justify-center rounded-full bg-green-500 text-gray-50 font-semibold px-5 py-3 hover:opacity-90 transition'
                    >
                      Hire Monthly
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </ElectricBorder>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-gray-400 text-sm'>
            Not sure which fits?{' '}
            <Link className='text-warning hover:underline transition' href='/contact'>
              Let's discuss
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
