import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LanguageSwitcher } from '@/components/language-switcher';
import { SEO, APP_CONFIG } from '@/lib/constants';
import { loadPersonalInfo, loadSocialLinks } from '@/lib/data-loader';
import { getLanguage } from '@/lib/get-language';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: APP_CONFIG.keywords,
  authors: [{ name: APP_CONFIG.author }],
  creator: APP_CONFIG.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_CONFIG.url,
    siteName: SEO.openGraph.siteName,
    title: SEO.defaultTitle,
    description: SEO.description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.author} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.description,
    creator: SEO.twitter.handle,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current language
  const lang = await getLanguage();
  
  // Load data for layout with current language
  const [personalInfoResult, socialLinksResult] = await Promise.all([
    loadPersonalInfo(lang),
    loadSocialLinks(lang),
  ]);

  const personalInfo = personalInfoResult.data;
  const socialLinks = socialLinksResult.data;

  return (
    <html lang={lang} className={`${inter.variable} dark`}>
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, nocache" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="slurp" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="duckduckbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar personalInfo={personalInfo} />
          <main className="flex-1">
            {children}
          </main>
          <Footer 
            socialLinks={socialLinks} 
            personalInfo={personalInfo}
          />
          <LanguageSwitcher />
        </div>
      </body>
    </html>
  );
}