import type { Metadata } from 'next';
import { CuratedPathways } from '../../components/CuratedPathways';
import { curatedPathways } from '../../data/pathways';
import { resolveLanguageCode } from '../../types/language';
import {
  generatePathwaysSchema,
  generateBreadcrumbSchema,
  buildCanonicalUrl,
  getLanguageAlternates,
  getOgLocale,
  SITE_URL,
  SITE_NAME
} from '../../utils/seo';

interface PathwaysPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PathwaysPageProps): Promise<Metadata> {
  const rawSearchParams = searchParams ? await searchParams : {};
  const rawLang = typeof rawSearchParams.lang === 'string' ? rawSearchParams.lang : undefined;
  const lang = resolveLanguageCode(rawLang);
  const canonical = buildCanonicalUrl('/pathways', { lang: lang || undefined });

  return {
    title: 'Curated Intimacy Pathways & Masterclasses',
    description: 'Structured progressive intimacy pathways and learning masterclasses for couples. Explore sensory awakening, communication, positions, and erotic longevity.',
    alternates: {
      canonical,
      languages: getLanguageAlternates('/pathways')
    },
    openGraph: {
      title: `Curated Intimacy Pathways & Masterclasses | ${SITE_NAME}`,
      description: 'Structured progressive intimacy pathways and learning masterclasses for couples.',
      url: canonical,
      locale: getOgLocale(lang || undefined),
      type: 'website'
    }
  };
}

export default function PathwaysPage() {
  const pathwaysSchema = generatePathwaysSchema(curatedPathways);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Curated Pathways', url: '/pathways' }
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      pathwaysSchema,
      breadcrumbSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1200px] mx-auto px-5 md:px-16 pt-24 pb-20 animate-fade-in">
        <CuratedPathways readTopicIds={[]} />
      </div>
    </>
  );
}
