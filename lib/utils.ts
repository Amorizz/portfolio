import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for Personal Portfolio with Obsidian Dark Theme

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate URL-friendly slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Generate social media icon name from platform
 */
export function getSocialIcon(platform: string): string {
  const iconMap: Record<string, string> = {
    linkedin: 'linkedin',
    github: 'github',
    instagram: 'instagram',
    twitter: 'twitter',
    email: 'mail'
  };
  return iconMap[platform] || 'external-link';
}

/**
 * Check if external link should open in new tab
 */
export function isExternalLink(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // During SSR, we can't access window.location.origin
    // So we'll check if the URL is clearly external
    if (typeof window === 'undefined') {
      // For SSR, assume external if it's not a relative path
      return !url.startsWith('/') && !url.startsWith('#');
    }
    
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Generate meta description from text
 */
export function generateMetaDescription(text: string, maxLength: number = 160): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  return truncateText(cleaned, maxLength);
}

/**
 * Debounce function for search/filter inputs
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if device is mobile based on screen width
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Get responsive image sizes for Next.js Image component
 */
export function getImageSizes(breakpoints: { sm: number; md: number; lg: number } = { sm: 640, md: 768, lg: 1024 }): string {
  return `(max-width: ${breakpoints.sm}px) 100vw, (max-width: ${breakpoints.md}px) 50vw, (max-width: ${breakpoints.lg}px) 33vw, 25vw`;
}

/**
 * Generate alt text for project images
 */
export function generateImageAlt(projectTitle: string, imageType: 'screenshot' | 'logo' | 'mockup' = 'screenshot'): string {
  return `${projectTitle} ${imageType}`;
}

/**
 * Format technology tags for display
 */
export function formatTechnologies(technologies: string[]): string[] {
  return technologies.map(tech => tech.trim()).filter(tech => tech.length > 0);
}

/**
 * Get contrast color (light/dark) based on background color
 */
export function getContrastColor(hexColor: string): 'light' | 'dark' {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? 'dark' : 'light';
}
