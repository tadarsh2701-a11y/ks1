import { TopicItem, CategoryInfo } from '../types/topics';
import { Pathway } from '../data/pathways';
import { LanguageCode, INDIAN_REGIONAL_LANGUAGES } from '../types/language';
import { getLocalizedTopic } from '../data/translations/topics';

export const SITE_URL = 'https://www.kamasoul.fun';
export const SITE_NAME = 'Velvet & Ember';
export const DEFAULT_OG_IMAGE = 'https://www.kamasoul.fun/assets/images/sensual_embrace_warm_1787823085718.jpg';
export const DEFAULT_DESCRIPTION =
  'A sensual, judgment-free guide to deeper connection, pleasure, and charged communication with your partner. Explore 101 curated intimacy guides and structured learning pathways.';

export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.split('?')[0].split('#')[0];
  if (cleanPath === '' || cleanPath === '/') {
    return `${SITE_URL}/`;
  }
  const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `${SITE_URL}${normalized}`;
}

export function getOgLocale(lang?: LanguageCode | string): string {
  const map: Record<string, string> = {
    en: 'en_US',
    hi: 'hi_IN',
    mr: 'mr_IN',
    bn: 'bn_IN',
    te: 'te_IN',
    ta: 'ta_IN',
    gu: 'gu_IN',
    kn: 'kn_IN',
    ml: 'ml_IN',
    or: 'or_IN',
    pa: 'pa_IN',
    ur: 'ur_IN',
    as: 'as_IN',
    mai: 'mai_IN',
    sat: 'sat_IN',
    ks: 'ks_IN',
    ne: 'ne_NP',
    kok: 'kok_IN',
    sd: 'sd_IN',
    doi: 'doi_IN',
    sa: 'sa_IN'
  };
  return (lang && map[lang]) || 'en_US';
}

/**
 * Builds standard hreflang alternate URLs for all supported regional languages
 */
export function getLanguageAlternates(pathname: string): Record<string, string> {
  const cleanPath = pathname.split('?')[0].split('#')[0];
  const normalized = cleanPath === '' || cleanPath === '/' ? '' : (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`);
  const defaultUrl = `${SITE_URL}${normalized || '/'}`;

  const alternates: Record<string, string> = {
    'x-default': defaultUrl,
    en: defaultUrl,
  };

  INDIAN_REGIONAL_LANGUAGES.forEach((lang) => {
    if (lang.code !== 'en') {
      alternates[lang.code] = `${SITE_URL}${normalized || ''}?lang=${lang.code}`;
    }
  });

  return alternates;
}

/**
 * Builds canonical URL accounting for query parameters (such as lang, category, difficulty)
 */
export function buildCanonicalUrl(
  pathname: string,
  params?: { lang?: string | null; category?: string | null; difficulty?: string | null }
): string {
  const cleanPath = pathname.split('?')[0].split('#')[0];
  const normalized = cleanPath === '' || cleanPath === '/' ? '/' : (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`);

  const queryParts: string[] = [];
  if (params?.category && params.category !== 'all') {
    queryParts.push(`category=${encodeURIComponent(params.category)}`);
  }
  if (params?.difficulty && params.difficulty !== 'all') {
    queryParts.push(`difficulty=${encodeURIComponent(params.difficulty)}`);
  }
  if (params?.lang && params.lang !== 'en') {
    queryParts.push(`lang=${encodeURIComponent(params.lang)}`);
  }

  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  const pathPart = normalized === '/' && queryParts.length > 0 ? '' : normalized;
  return `${SITE_URL}${pathPart}${queryString}`;
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/topics?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    description: DEFAULT_DESCRIPTION,
    sameAs: []
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`
    }))
  };
}

export function generateTopicArticleSchema(topic: TopicItem, lang?: LanguageCode | string) {
  const resolvedLang = (lang as LanguageCode) || 'en';
  const localized = resolvedLang !== 'en' ? getLocalizedTopic(topic, resolvedLang) : topic;
  const pageUrl = `${SITE_URL}/topic/${topic.slug}${resolvedLang !== 'en' ? `?lang=${resolvedLang}` : ''}`;
  const readingMinutes = parseInt(localized.estimatedTime || topic.estimatedTime, 10) || 6;
  const isoDuration = `PT${readingMinutes}M`;

  const steps = (localized.howToDoIt || topic.howToDoIt || []).map((stepText, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: `Step ${idx + 1}`,
    text: stepText
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Article', 'HowTo'],
        '@id': `${pageUrl}#article`,
        isPartOf: {
          '@type': 'WebPage',
          '@id': pageUrl,
          url: pageUrl,
          name: `${localized.title} | ${SITE_NAME}`
        },
        headline: localized.title,
        alternativeHeadline: localized.subtitle,
        description: localized.whatItIs || localized.overview?.whyItMatters || localized.subtitle,
        inLanguage: resolvedLang,
        url: pageUrl,
        name: localized.title,
        totalTime: isoDuration,
        step: steps.length > 0 ? steps : undefined,
        about: {
          '@type': 'Thing',
          name: localized.categoryName || topic.categoryName || 'Intimate Relationship Education'
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/favicon.svg`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl
        }
      }
    ]
  };
}

export function generateTopicFaqSchema(topic: TopicItem, lang?: LanguageCode | string) {
  const resolvedLang = (lang as LanguageCode) || 'en';
  const localized = resolvedLang !== 'en' ? getLocalizedTopic(topic, resolvedLang) : topic;
  const faqs = localized.faqs || topic.faqs;
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generatePathwaysSchema(pathways: Pathway[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Curated Intimacy Pathways & Masterclasses',
    description: 'Structured progressive intimacy pathways and learning sequences for couples.',
    itemListElement: pathways.map((pathway, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: pathway.title,
        description: pathway.description,
        timeRequired: pathway.duration,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: `${SITE_URL}/`
        }
      }
    }))
  };
}
