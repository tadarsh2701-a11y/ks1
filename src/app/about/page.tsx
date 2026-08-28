import type { Metadata } from 'next';
import { AboutView } from '../../components/AboutView';
import { resolveLanguageCode } from '../../types/language';
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  buildCanonicalUrl,
  getLanguageAlternates,
  getOgLocale,
  SITE_URL,
  SITE_NAME
} from '../../utils/seo';

interface AboutPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: AboutPageProps): Promise<Metadata> {
  const rawSearchParams = searchParams ? await searchParams : {};
  const rawLang = typeof rawSearchParams.lang === 'string' ? rawSearchParams.lang : undefined;
  const lang = resolveLanguageCode(rawLang);
  const canonical = buildCanonicalUrl('/about', { lang: lang || undefined });

  return {
    title: 'About Our Intimate Philosophy & Sanctuary',
    description: 'Learn about the Velvet & Ember philosophy: bridging ancient somatic wisdom, neurochemistry, and compassionate communication for deeper couples intimacy.',
    alternates: {
      canonical,
      languages: getLanguageAlternates('/about')
    },
    openGraph: {
      title: `About Our Intimate Philosophy & Sanctuary | ${SITE_NAME}`,
      description: 'Learn about the Velvet & Ember philosophy: bridging ancient somatic wisdom, neurochemistry, and compassionate communication for deeper couples intimacy.',
      url: canonical,
      locale: getOgLocale(lang || undefined),
      type: 'website'
    }
  };
}

export default function AboutPage() {
  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About the Sanctuary', url: '/about' }
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      orgSchema,
      breadcrumbSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-16 sm:pt-20">
        <AboutView />
      </div>
    </>
  );
}
