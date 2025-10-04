// Constants for Personal Portfolio with Obsidian Dark Theme

import { ThemeConfig } from './types';

/**
 * Obsidian Dark Theme Configuration
 */
export const OBSIDIAN_THEME: ThemeConfig = {
  colors: {
    primary: '#0D1117',      // GitHub dark background
    secondary: '#161B22',    // GitHub dark surface
    accent: '#58A6FF',       // GitHub blue
    text: '#F0F6FC',         // GitHub light text
    muted: '#8B949E',        // GitHub muted text
    success: '#3FB950',      // GitHub green
    warning: '#D29922',      // GitHub orange
    error: '#F85149',        // GitHub red
  },
  fonts: {
    sans: ['Inter', 'sans-serif'],
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

/**
 * Application Configuration
 */
export const APP_CONFIG = {
  name: 'Amaud Portfolio',
  description: 'Personal portfolio showcasing authentic personality, ambition, passion, and obsession',
  url: 'https://amaud.dev', // Update with your actual domain
  author: 'Amaud',
  keywords: [
    'portfolio',
    'developer',
    'full-stack',
    'web development',
    'typescript',
    'nextjs',
    'react',
    'tailwind',
  ],
  social: {
    twitter: '@amaud', // Update with your Twitter handle
    github: 'amaud',   // Update with your GitHub username
  },
};

/**
 * Navigation Configuration
 */
export const NAVIGATION = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ],
  mobile: {
    menuButton: 'Open main menu',
    closeButton: 'Close main menu',
  },
};

/**
 * Performance Configuration
 */
export const PERFORMANCE = {
  lighthouse: {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 90,
  },
  bundleSize: {
    maxInitialJS: 100, // KB
    maxLoadTime: 3000, // ms
  },
  images: {
    formats: ['webp', 'avif', 'png', 'jpg'],
    quality: 80,
    placeholder: 'blur',
  },
};

/**
 * Content Configuration
 */
export const CONTENT = {
  projects: {
    featuredCount: 3,
    perPage: 6,
    maxDescriptionLength: 150,
  },
  hero: {
    maxBioLength: 300,
    avatarSize: 200,
  },
  social: {
    platforms: ['linkedin', 'github', 'instagram', 'twitter', 'email'],
    iconSize: 24,
  },
  quotes: {
    maxLength: 500,
    rotationInterval: 10000, // ms
  },
};

/**
 * SEO Configuration
 */
export const SEO = {
  defaultTitle: 'Amaud - Full Stack Developer',
  titleTemplate: '%s | Amaud Portfolio',
  description: 'Personal portfolio showcasing authentic personality, ambition, passion, and obsession through modern web development',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Amaud Portfolio',
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@amaud',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Accessibility Configuration
 */
export const ACCESSIBILITY = {
  focus: {
    ringColor: OBSIDIAN_THEME.colors.accent,
    ringWidth: '2px',
    ringOffset: '2px',
  },
  colors: {
    contrast: {
      minimum: 4.5, // WCAG AA
      enhanced: 7.0, // WCAG AAA
    },
  },
  keyboard: {
    tabIndex: 0,
    skipLinks: true,
  },
  screenReader: {
    announcements: true,
    liveRegions: true,
  },
};

/**
 * Animation Configuration
 */
export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  transitions: {
    hover: 'all 150ms ease-in-out',
    focus: 'all 150ms ease-in-out',
    transform: 'transform 300ms ease-in-out',
  },
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  dataLoading: 'Failed to load data. Please try again later.',
  projectNotFound: 'Project not found.',
  networkError: 'Network error. Please check your connection.',
  generic: 'Something went wrong. Please try again.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  contactSent: 'Thank you for your message! I\'ll get back to you soon.',
  projectViewed: 'Project loaded successfully.',
};

/**
 * External Links Configuration
 */
export const EXTERNAL_LINKS = {
  security: {
    rel: 'noopener noreferrer',
    target: '_blank',
  },
  social: {
    linkedin: 'https://linkedin.com/in/',
    github: 'https://github.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
  },
};

/**
 * File Paths
 */
export const PATHS = {
  data: {
    projects: '/data/projects.json',
    personalInfo: '/data/personal-info.json',
    socialLinks: '/data/social-links.json',
    visionQuotes: '/data/vision-quotes.json',
  },
  images: {
    avatar: '/images/avatar.jpg',
    projects: '/images/projects/',
    icons: '/images/icons/',
  },
  public: {
    favicon: '/favicon.ico',
    manifest: '/manifest.json',
  },
};

/**
 * Development Configuration
 */
export const DEV_CONFIG = {
  debug: process.env.NODE_ENV === 'development',
  analytics: process.env.NODE_ENV === 'production',
  hotReload: process.env.NODE_ENV === 'development',
};

/**
 * Environment Variables
 */
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@amaud.dev',
};
