import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges Tailwind CSS class names.
 * @example
 * cn('bg-red-500', isDark && 'bg-black')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
