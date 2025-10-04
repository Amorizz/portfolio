'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getSocialIcon } from '@/lib/utils';
import { SocialLinksProps } from '@/lib/types';
import { EXTERNAL_LINKS } from '@/lib/constants';

// Custom minimalist SVG icons
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const iconMap = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  instagram: InstagramIcon
};

export function SocialLinks({ socialLinks, className }: SocialLinksProps) {
  const getIcon = (platform: string) => {
    const iconName = getSocialIcon(platform);
    return iconMap[iconName as keyof typeof iconMap] || null;
  };

  // Filter to only show LinkedIn, GitHub, and Instagram with valid icons
  const filteredSocialLinks = socialLinks.filter(link => {
    const platform = link.platform.toLowerCase();
    return ['linkedin', 'github', 'instagram'].includes(platform) && 
           iconMap[platform as keyof typeof iconMap];
  });

  const handleClick = (url: string, platform: string) => {
    // Track social link clicks for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'social',
        event_label: platform,
        value: url,
      });
    }
  };

  // Determine if a link is external based on the platform - make this consistent
  const isExternalLink = (platform: string) => {
    return platform !== 'email';
  };

  return (
    <div className={cn('flex flex-wrap justify-center gap-4', className)}>
      {filteredSocialLinks.map((link) => {
        const Icon = getIcon(link.platform);
        const isExternal = isExternalLink(link.platform);
        
        return (
          <Button
            key={`${link.platform}-${link.url}`}
            asChild
            variant="ghost"
            size="sm"
            className="group h-12 w-12 rounded-full bg-muted/30 hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all duration-200 space-hover border border-border/50"
            onClick={() => handleClick(link.url, link.platform)}
          >
            <a
              href={link.url}
              target={isExternal ? EXTERNAL_LINKS.security.target : undefined}
              rel={isExternal ? EXTERNAL_LINKS.security.rel : undefined}
              className="flex items-center justify-center"
              aria-label={`Visit ${link.label} profile`}
            >
              <Icon />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
