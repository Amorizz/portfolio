'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getNavigation } from '@/lib/get-navigation';
import { NavbarProps } from '@/lib/types';

export function Navbar({ personalInfo, className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    setLang((saved === 'fr' ? 'fr' : 'en'));
  }, []);

  const NAVIGATION = getNavigation(lang);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={cn('relative bg-transparent', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-accent hover:text-accent/80 transition-colors duration-200"
              onClick={closeMenu}
            >
              <Image
                src="/images/logo.png"
                alt="Amaury Dufrenot Portfolio logo"
                width={50}
                height={50}
                className="w-25 h-25"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              {NAVIGATION.main.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200',
                      isActive
                        ? 'text-accent bg-secondary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-foreground hover:text-accent hover:bg-secondary"
              aria-label={isOpen ? NAVIGATION.mobile.closeButton : NAVIGATION.mobile.menuButton}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary rounded-lg mt-2">
              {NAVIGATION.main.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                      isActive
                        ? 'text-accent bg-background'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background'
                    )}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
