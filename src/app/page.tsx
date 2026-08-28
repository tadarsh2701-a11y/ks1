import type { Metadata } from 'next';
import { HomeClientView } from '../components/HomeClientView';
import { resolveLanguageCode } from '../types/language';
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  buildCanonicalUrl,
  getLanguageAlternates,
  getOgLocale,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  SITE_URL
} from '../utils/seo';

interface HomePageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const rawSearchParams = searchParams ? await searchParams : {};
  const rawLang = typeof rawSearchParams.lang === 'string' ? rawSearchParams.lang : undefined;
  const lang = resolveLanguageCode(rawLang);
  const canonical = buildCanonicalUrl('/', { lang: lang || undefined });

  return {
    title: 'Velvet & Ember - Conscious Intimacy & Relationship Guides',
    description: DEFAULT_DESCRIPTION,
    alternates: {
      canonical,
      languages: getLanguageAlternates('/')
    },
    openGraph: {
      title: 'Velvet & Ember - Conscious Intimacy & Relationship Guides',
      description: DEFAULT_DESCRIPTION,
      url: canonical,
      locale: getOgLocale(lang || undefined),
      type: 'website'
    }
  };
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebSiteSchema(),
      generateOrganizationSchema()
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClientView />
    </>
  );
}