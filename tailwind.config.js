import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        warning: {
          50: '#f5f3ff', // lightest
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#9333ea', // main
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#581c87',
          900: '#3b0764', // darkest
          DEFAULT: '#9333ea',
          foreground: '#ffffff',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          extend: 'light',
          colors: {
            warning: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#9333ea',
              600: '#7e22ce',
              700: '#6b21a8',
              800: '#581c87',
              900: '#3b0764',
              DEFAULT: '#9333ea',
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          extend: 'dark',
          colors: {
            warning: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#9333ea',
              600: '#7e22ce',
              700: '#6b21a8',
              800: '#581c87',
              900: '#3b0764',
              DEFAULT: '#9333ea',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
};
