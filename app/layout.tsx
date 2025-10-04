import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SEO, APP_CONFIG } from '@/lib/constants';

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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer 
            socialLinks={[]} 
            personalInfo={{
              name: 'Amaud',
              title: 'Full Stack Developer',
              bio: 'Passionate developer with expertise in modern web technologies',
              avatar: '/images/avatar.jpg',
              avatarAlt: 'Profile photo of Amaud',
              email: 'contact@amaud.dev',
            }}
          />
        </div>
      </body>
    </html>
  );
}