// Get navigation items based on language

export function getNavigation(lang: 'en' | 'fr') {
  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      openMenu: 'Open main menu',
      closeMenu: 'Close main menu',
    },
    fr: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      openMenu: 'Ouvrir le menu principal',
      closeMenu: 'Fermer le menu principal',
    },
  };

  const t = translations[lang];

  return {
    main: [
      { name: t.home, href: '/' },
      { name: t.about, href: '/about' },
      { name: t.projects, href: '/projects' },
    ],
    mobile: {
      menuButton: t.openMenu,
      closeButton: t.closeMenu,
    },
  };
}

