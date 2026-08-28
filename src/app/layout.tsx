import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { AppLayoutWrapper } from '../components/AppLayoutWrapper';
import { generateWebSiteSchema, generateOrganizationSchema, SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from '../utils/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Velvet & Ember - Conscious Intimacy & Relationship Guides',
    template: `%s | ${SITE_NAME}`
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    'conscious intimacy',
    'relationship communication',
    'somatic intimacy',
    'couples connection',
    'intimate communication',
    'tantra',
    'mindful touch',
    'relationship wellness'
  ],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  },
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Velvet & Ember - Conscious Intimacy & Relationship Guides',
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Velvet & Ember Sanctuary'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velvet & Ember - Conscious Intimacy & Relationship Guides',
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const rootSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebSiteSchema(),
      generateOrganizationSchema()
    ]
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          id="seo-root-structured-data"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>
      <body className="bg-[#131313] text-[#e5e2e1] antialiased overflow-x-hidden selection:bg-[#4e1b1d] selection:text-[#ffb3b2]">
        <AppLayoutWrapper>
          {children}
        </AppLayoutWrapper>
        <GoogleAnalytics gaId="G-72CZHL9WYJ" />
      </body>
    </html>
  );
}