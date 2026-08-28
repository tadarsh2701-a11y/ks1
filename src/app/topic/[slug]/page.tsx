import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allTopics, getTopicBySlug } from '../../../data/all-topics';
import { getTopicImage, getAbsoluteImageUrl } from '../../../data/images';
import { getLocalizedTopic } from '../../../data/translations/topics';
import { resolveLanguageCode } from '../../../types/language';
import { TopicDetailClientWrapper } from '../../../components/TopicDetailClientWrapper';
import {
  generateTopicArticleSchema,
  generateTopicFaqSchema,
  generateBreadcrumbSchema,
  buildCanonicalUrl,
  getLanguageAlternates,
  getOgLocale,
  SITE_URL,
  SITE_NAME
} from '../../../utils/seo';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return allTopics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params, searchParams }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawSearchParams = searchParams ? await searchParams : {};
  const rawLang = typeof rawSearchParams.lang === 'string' ? rawSearchParams.lang : undefined;
  const lang = resolveLanguageCode(rawLang);
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return {
      title: 'Topic Not Found',
      description: 'The requested guide could not be found.'
    };
  }

  const localizedTopic = lang ? getLocalizedTopic(topic, lang) : topic;
  const title = `${localizedTopic.title} — Intimacy Guide #${topic.id}`;
  const whyItMatters = localizedTopic.overview?.whyItMatters || localizedTopic.keyTakeaway || localizedTopic.whatItIs;
  const description = `${localizedTopic.subtitle}. ${whyItMatters || ''}`.slice(0, 158);
  const canonicalUrl = buildCanonicalUrl(`/topic/${topic.slug}`, { lang: lang || undefined });
  const ogImageUrl = getAbsoluteImageUrl(getTopicImage(topic.id, topic.categoryId));
  const ogLocale = getOgLocale(lang || undefined);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(`/topic/${topic.slug}`)
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      locale: ogLocale,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: localizedTopic.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {
  const { slug } = await params;
  const rawSearchParams = searchParams ? await searchParams : {};
  const rawLang = typeof rawSearchParams.lang === 'string' ? rawSearchParams.lang : undefined;
  const lang = resolveLanguageCode(rawLang);
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const localizedTopic = lang ? getLocalizedTopic(topic, lang) : topic;
  const canonicalUrl = buildCanonicalUrl(`/topic/${topic.slug}`, { lang: lang || undefined });

  const breadcrumbList = [
    { name: 'Home', url: '/' },
    { name: 'All Guides', url: '/topics' },
    { name: localizedTopic.categoryName || topic.categoryName, url: `/topics?category=${topic.categoryId}` },
    { name: localizedTopic.title, url: canonicalUrl }
  ];

  const topicArticleSchema = generateTopicArticleSchema(topic, lang || 'en');
  const topicFaqSchema = generateTopicFaqSchema(topic, lang || 'en');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbList);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      topicArticleSchema,
      breadcrumbSchema,
      ...(topicFaqSchema ? [topicFaqSchema] : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-16 sm:pt-20">
        <TopicDetailClientWrapper topic={topic} />
      </div>
    </>
  );
}
