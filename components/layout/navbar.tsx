'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNavigation } from '@/lib/get-navigation';
import { useLanguage } from '@/lib/use-language';
import { FrFlag, GbFlag } from '@/components/ui/flags';
import { NavbarProps } from '@/lib/types';

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const NAVIGATION = getNavigation(language);
  const closeMenu = () => setIsOpen(false);

  const CurrentFlag = language === 'en' ? GbFlag : FrFlag;

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      <div className="flex justify-center px-4 pt-6">
        <nav className={cn(
          'flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500',
          scrolled
            ? 'bg-card/90 backdrop-blur-xl border border-border/30 shadow-lg shadow-black/10'
            : 'bg-card/60 backdrop-blur-md border border-border/15'
        )}>
          <div className="hidden md:flex items-center gap-1">
            {NAVIGATION.main.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'relative px-5 py-2.5 min-h-[44px] flex items-center rounded-full text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-primary-foreground bg-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block w-px h-5 bg-border/30 mx-1" />

          <button
            onClick={toggleLanguage}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-secondary/60 transition-all duration-200 group"
            aria-label={language === 'en' ? 'Switch to French' : 'Switch to English'}
          >
            <div className="relative w-5 h-3.5 rounded-[3px] overflow-hidden ring-1 ring-black/10 group-hover:ring-black/20 transition-all">
              <CurrentFlag className="w-full h-full" />
            </div>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label={isOpen ? NAVIGATION.mobile.closeButton : NAVIGATION.mobile.menuButton}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          onClick={closeMenu}
        >
          <div
            className="flex flex-col items-center justify-center h-full gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {NAVIGATION.main.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-3xl font-bold font-display tracking-tight transition-colors py-4 px-6',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="mt-6">
              <button
                onClick={() => { toggleLanguage(); closeMenu(); }}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-secondary/40 hover:bg-secondary/60 transition-all duration-200"
              >
                <div className="relative w-8 h-5.5 rounded overflow-hidden ring-1 ring-black/10">
                  <CurrentFlag className="w-full h-full" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Passer en Francais' : 'Switch to English'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
