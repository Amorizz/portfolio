'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FooterProps } from '@/lib/types';
import { getNavigation } from '@/lib/get-navigation';

export function Footer({ socialLinks, personalInfo, className }: FooterProps) {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    setLang((saved === 'fr' ? 'fr' : 'en'));
  }, []);

  const navigation = getNavigation(lang);
  const currentYear = new Date().getFullYear();
  const linkedIn = socialLinks.find((l) => l.platform === 'linkedin');
  const github = socialLinks.find((l) => l.platform === 'github');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={cn('border-t border-border/15', className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="text-xl font-bold text-foreground font-display tracking-tight">
              ad<span className="text-gradient">.</span>
            </Link>
            <p className="text-sm text-muted-foreground/60 mt-3 leading-relaxed max-w-[240px]">
              {personalInfo.title}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest mb-4">
              Pages
            </h4>
            <div className="space-y-3">
              {navigation.main.map((item) => (
                <Link key={item.href} href={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.location && (
                <span className="block text-sm text-muted-foreground/60">{personalInfo.location}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/10">
          <p className="text-xs text-muted-foreground/35 font-mono">
            &copy; {currentYear} {personalInfo.name}
          </p>

          <div className="flex items-center gap-1">
            {linkedIn && (
              <a href={linkedIn.url} target="_blank" rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground/35 hover:text-primary transition-colors rounded-full">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {github && (
              <a href={github.url} target="_blank" rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground/35 hover:text-foreground transition-colors rounded-full">
                <Github className="h-4 w-4" />
              </a>
            )}
            <a href={`mailto:${personalInfo.email}`}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground/35 hover:text-primary transition-colors rounded-full">
              <Mail className="h-4 w-4" />
            </a>
            <div className="w-px h-4 bg-border/15 mx-1" />
            <button onClick={scrollToTop}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground/35 hover:text-primary transition-colors rounded-full">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
