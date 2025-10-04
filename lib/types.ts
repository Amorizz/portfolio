// TypeScript interfaces for Personal Portfolio with Obsidian Dark Theme

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  avatarAlt: string;
  location?: string;
  email: string;
  phone?: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'instagram' | 'twitter' | 'email';
  url: string;
  icon: string;
  label: string;
  order: number;
  enabled: boolean;
}

export interface VisionQuote {
  id: string;
  quote: string;
  author?: string;
  order: number;
  enabled: boolean;
}

// Utility types for component props
export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface ProjectGridProps {
  projects: Project[];
  featured?: boolean;
  className?: string;
}

export interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  className?: string;
}

export interface NavbarProps {
  className?: string;
}

export interface FooterProps {
  socialLinks: SocialLink[];
  personalInfo: PersonalInfo;
  className?: string;
}

export interface VisionQuoteProps {
  quote: VisionQuote;
  className?: string;
}

export interface SocialLinksProps {
  socialLinks: SocialLink[];
  className?: string;
}

// Data loading types
export interface DataLoaderResult<T> {
  data: T;
  error?: string;
}

// Theme configuration types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    sans: string[];
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
