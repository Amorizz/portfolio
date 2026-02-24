'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNavigation } from '@/lib/get-navigation';
import { NavbarProps } from '@/lib/types';

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    setLang(saved === 'fr' ? 'fr' : 'en');
  }, []);

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

  const NAVIGATION = getNavigation(lang);
  const closeMenu = () => setIsOpen(false);

  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('preferred-language', next);
    window.location.reload();
  };

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
            onClick={toggleLang}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-secondary/60 transition-colors leading-none"
            aria-label={lang === 'en' ? 'Switch to French' : 'Switch to English'}
          >
            {lang === 'en' ? (
              <svg viewBox="0 0 640 480" className="size-5 rounded-sm" aria-hidden="true">
                <path fill="#012169" d="M0 0h640v480H0z" />
                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
                <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
                <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
                <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 640 480" className="size-5 rounded-sm" aria-hidden="true">
                <path fill="#002395" d="M0 0h213.3v480H0z" />
                <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
                <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
              </svg>
            )}
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
                onClick={() => { toggleLang(); closeMenu(); }}
                className="transition-opacity hover:opacity-70"
              >
                {lang === 'en' ? (
                  <svg viewBox="0 0 640 480" className="w-10 h-7 rounded" aria-hidden="true">
                    <path fill="#012169" d="M0 0h640v480H0z" />
                    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
                    <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
                    <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
                    <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 640 480" className="w-10 h-7 rounded" aria-hidden="true">
                    <path fill="#002395" d="M0 0h213.3v480H0z" />
                    <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
                    <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
