'use client';

import { useState, useEffect } from 'react';

type Language = 'en' | 'fr';

function FrFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#002395" d="M0 0h213.3v480H0z" />
      <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
      <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
    </svg>
  );
}

function GbFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
      <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
      <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
      <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const next = language === 'en' ? 'fr' : 'en';
    setLanguageState(next);
    localStorage.setItem('preferred-language', next);
    document.cookie = `preferred-language=${next}; path=/; max-age=31536000`;
    window.location.reload();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] bg-card/80 hover:bg-card border border-border/50 hover:border-border text-muted-foreground hover:text-foreground rounded-md shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
        aria-label={language === 'en' ? 'Switch to French' : 'Switch to English'}
      >
        {language === 'en' ? <GbFlag className="w-5 h-3.5 rounded-sm" /> : <FrFlag className="w-5 h-3.5 rounded-sm" />}
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>
    </div>
  );
}
