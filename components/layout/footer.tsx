'use client';

import Link from 'next/link';
import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { FooterProps } from '@/lib/types';
import { SocialLinks } from '@/components/sections/social-links';
import { APP_CONFIG } from '@/lib/constants';

export function Footer({ socialLinks, personalInfo, className }: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-background border-t border-border', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              {personalInfo.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {personalInfo.bio}
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Made with passion</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Connect</h4>
            <div className="space-y-3">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  {personalInfo.phone}
                </a>
              )}
              {personalInfo.location && (
                <p className="text-muted-foreground">
                  📍 {personalInfo.location}
                </p>
              )}
            </div>
            <SocialLinks socialLinks={socialLinks} />
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-accent hover:bg-secondary"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
