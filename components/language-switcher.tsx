'use client';

import { useLanguage } from '@/lib/use-language';
import { FrFlag, GbFlag } from '@/components/ui/flags';

export function LanguageSwitcher() {
  const { language, toggleLanguage, mounted } = useLanguage();

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="h-10 w-[72px] rounded-full bg-card/60 border border-border/30 animate-pulse" />
      </div>
    );
  }

  const nextLang = language === 'en' ? 'FR' : 'EN';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={toggleLanguage}
        className="group flex items-center gap-2 px-3.5 py-2 h-10 bg-card/80 hover:bg-card border border-border/50 hover:border-border rounded-full shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 backdrop-blur-xl"
        aria-label={language === 'en' ? 'Switch to French' : 'Switch to English'}
      >
        <div className="relative w-5 h-3.5 rounded-[3px] overflow-hidden ring-1 ring-black/10">
          {language === 'en' ? <GbFlag className="w-full h-full" /> : <FrFlag className="w-full h-full" />}
        </div>
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors tracking-wide">
          {nextLang}
        </span>
      </button>
    </div>
  );
}
