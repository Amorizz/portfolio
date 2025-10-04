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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col items-start space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              {personalInfo.name}
            </h3>
            <div className="w-full flex justify-start">
              <SocialLinks socialLinks={socialLinks} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                Projects
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Connect</h4>
            <div className="flex flex-col space-y-3">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  {personalInfo.phone}
                </a>
              )}
              {personalInfo.location && (
                <p className="text-sm text-muted-foreground">
                  📍 {personalInfo.location}
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-xs text-muted-foreground">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-accent hover:bg-secondary transition-colors duration-200"
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
