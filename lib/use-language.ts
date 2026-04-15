'use client';

import { useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'fr';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language | null;
    if (saved === 'en' || saved === 'fr') {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = useCallback(() => {
    const next: Language = language === 'en' ? 'fr' : 'en';
    setLanguageState(next);
    localStorage.setItem('preferred-language', next);
    document.cookie = `preferred-language=${next}; path=/; max-age=31536000`;
    window.location.reload();
  }, [language]);

  return { language, toggleLanguage, mounted };
}
