'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

type Language = 'en' | 'fr';

export function LanguageSwitcher() {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const switchLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    // Also set cookie for server-side access
    document.cookie = `preferred-language=${lang}; path=/; max-age=31536000`;
    setIsOpen(false);
    // Reload the page to fetch new data
    window.location.reload();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-card/80 hover:bg-card border border-border/50 hover:border-border text-muted-foreground hover:text-foreground rounded-md shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>

      {/* Language Options */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-card border border-border rounded-md shadow-xl p-1.5 min-w-[110px] animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => switchLanguage('en')}
            className={`w-full text-left px-3 py-2 rounded-sm transition-colors text-sm ${
              language === 'en'
                ? 'bg-accent/20 text-foreground font-medium'
                : 'hover:bg-accent/10 text-muted-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🇬🇧</span>
              <span>EN</span>
            </span>
          </button>
          <button
            onClick={() => switchLanguage('fr')}
            className={`w-full text-left px-3 py-2 rounded-sm transition-colors text-sm ${
              language === 'fr'
                ? 'bg-accent/20 text-foreground font-medium'
                : 'hover:bg-accent/10 text-muted-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🇫🇷</span>
              <span>FR</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

