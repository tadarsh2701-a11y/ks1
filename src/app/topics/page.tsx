import type { Metadata } from 'next';
import { TopicsListClientView } from '../../components/TopicsListClientView';
import { categories } from '../../data/categories';
import { categoryTranslations } from '../../data/translations/categories';
import { resolveLanguageCode } from '../../types/language';
import {
  generateBreadcrumbSchema,
  buildCanonicalUrl,
  getLanguageAlternates,
  getOgLocale,
  SITE_URL,
  SITE_NAME
} from '../../utils/seo';

interface TopicsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: TopicsPageProps): Promise<Metadata> {
  const rawSearchParams = searchParams ? await searchParams : {};
  const rawCategory = typeof rawSearchParams.category === 'string' ? rawSearchParams.category : undefined;
  const rawDifficulty = typeof rawSearchParams.difficulty === 'string' ? rawSearchParams.difficulty : undefined;
  const rawLang = typeof rawSearchParams.lang === 'string' ? rawSearchParams.lang : undefined;
  const lang = resolveLanguageCode(rawLang);

  // 1. If Category Filter Query Parameter is present
  if (rawCategory && rawCategory !== 'all') {
    const cat = categories.find((c) => c.id === rawCategory);
    if (cat) {
      const catTrans = lang
        ? categoryTranslations[lang]?.[cat.id] || categoryTranslations.en[cat.id] || cat
        : cat;
      const catTitle = catTrans.title || cat.title;
      const canonical = buildCanonicalUrl('/topics', { category: rawCategory, lang: lang || undefined });
      const description = `${catTrans.description || cat.description} Explore all ${cat.topicCount} curated masterclasses and practical intimacy techniques.`;
      const title = `${catTitle} (${cat.topicCount} Intimacy Guides) | ${SITE_NAME}`;

      return {
        title,
        description,
        alternates: {
          canonical,
          languages: getLanguageAlternates(`/topics?category=${rawCategory}`)
        },
        openGraph: {
          title,
          description,
          url: canonical,
          locale: getOgLocale(lang || undefined),
          type: 'website'
        }
      };
    }
  }

  // 2. If Difficulty Filter Query Parameter is present
  if (rawDifficulty && rawDifficulty !== 'all') {
    const canonical = buildCanonicalUrl('/topics', { difficulty: rawDifficulty, lang: lang || undefined });
    const title = `${rawDifficulty} Intimacy Guides & Somatic Practices | ${SITE_NAME}`;
    const description = `Curated ${rawDifficulty}-level guides and somatic practices designed to deepen connection, communication, and comfort.`;

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: getLanguageAlternates(`/topics?difficulty=${rawDifficulty}`)
      },
      openGraph: {
        title,
        description,
        url: canonical,
        locale: getOgLocale(lang || undefined),
        type: 'website'
      }
    };
  }

  // 3. Default /topics or ?lang=...
  const canonical = buildCanonicalUrl('/topics', { lang: lang || undefined });
  const title = 'Explore All 101 Intimacy Guides & Somatic Practices';
  const description = 'Curated experiences and structured masterclasses designed to deepen couples intimacy, sensual communication, pleasure anatomy, and emotional safety.';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates('/topics')
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      locale: getOgLocale(lang || undefined),
      type: 'website'
    }
  };
}

export default async function TopicsPage({ searchParams }: TopicsPageProps) {
  const rawSearchParams = searchParams ? await searchParams : {};
  const rawCategory = typeof rawSearchParams.category === 'string' ? rawSearchParams.category : undefined;
  const rawDifficulty = typeof rawSearchParams.difficulty === 'string' ? rawSearchParams.difficulty : undefined;
  const rawLang = typeof rawSearchParams.lang === 'string' ? rawSearchParams.lang : undefined;
  const lang = resolveLanguageCode(rawLang);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: '101 Guides', url: '/topics' }
  ];

  if (rawCategory && rawCategory !== 'all') {
    const cat = categories.find((c) => c.id === rawCategory);
    if (cat) {
      breadcrumbItems.push({
        name: cat.title,
        url: `/topics?category=${cat.id}`
      });
    }
  } else if (rawDifficulty && rawDifficulty !== 'all') {
    breadcrumbItems.push({
      name: `${rawDifficulty} Level`,
      url: `/topics?difficulty=${rawDifficulty}`
    });
  }

  const breadcrumbJsonLd = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TopicsListClientView />
    </>
  );
}