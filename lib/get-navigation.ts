export function getNavigation(lang: 'en' | 'fr') {
  const translations = {
    en: {
      home: 'Home',
      projects: 'Projects',
      cv: 'CV',
      openMenu: 'Open main menu',
      closeMenu: 'Close main menu',
    },
    fr: {
      home: 'Accueil',
      projects: 'Projets',
      cv: 'CV',
      openMenu: 'Ouvrir le menu principal',
      closeMenu: 'Fermer le menu principal',
    },
  };

  const t = translations[lang];

  return {
    main: [
      { name: t.home, href: '/' },
      { name: t.projects, href: '/projects' },
      { name: t.cv, href: '/cv' },
    ],
    mobile: {
      menuButton: t.openMenu,
      closeButton: t.closeMenu,
    },
  };
}

