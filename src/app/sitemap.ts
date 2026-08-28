import { MetadataRoute } from 'next';
import { allTopics } from '../data/all-topics';
import { categories } from '../data/categories';
import { SITE_URL, getLanguageAlternates } from '../utils/seo';

// Top regional languages to index explicitly with dedicated sitemap entries
const TOP_INDEXABLE_LANGS = ['hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'ur', 'or'] as const;
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Primary Static Canonical Routes with full hreflang alternates
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: getLanguageAlternates('/')
      }
    },
    {
      url: `${SITE_URL}/topics`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: {
        languages: getLanguageAlternates('/topics')
      }
    },
    {
      url: `${SITE_URL}/pathways`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: getLanguageAlternates('/pathways')
      }
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getLanguageAlternates('/about')
      }
    },
  ];

  // 2. Multilingual Static Routes (Query Parameter: ?lang=...)
  const multilingualStaticRoutes: MetadataRoute.Sitemap = [];
  TOP_INDEXABLE_LANGS.forEach((lang) => {
    multilingualStaticRoutes.push(
      {
        url: `${SITE_URL}/?lang=${lang}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/topics?lang=${lang}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.85,
      },
      {
        url: `${SITE_URL}/pathways?lang=${lang}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
      },
      {
        url: `${SITE_URL}/about?lang=${lang}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.75,
      }
    );
  });

  // 3. Category Filtered Routes (Query Parameter: ?category=...)
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/topics?category=${cat.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Difficulty Filtered Routes (Query Parameter: ?difficulty=...)
  const difficultyRoutes: MetadataRoute.Sitemap = DIFFICULTIES.map((diff) => ({
    url: `${SITE_URL}/topics?difficulty=${diff}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Topic Canonical Routes (All 101 topics with full hreflang alternates)
  const topicRoutes: MetadataRoute.Sitemap = allTopics.map((topic) => ({
    url: `${SITE_URL}/topic/${topic.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: {
      languages: getLanguageAlternates(`/topic/${topic.slug}`)
    }
  }));

  // 6. Multilingual Topic Routes for Top Regional Languages (Query Parameter: ?lang=...)
  const multilingualTopicRoutes: MetadataRoute.Sitemap = [];
  allTopics.forEach((topic) => {
    TOP_INDEXABLE_LANGS.forEach((lang) => {
      multilingualTopicRoutes.push({
        url: `${SITE_URL}/topic/${topic.slug}?lang=${lang}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return [
    ...staticRoutes,
    ...multilingualStaticRoutes,
    ...categoryRoutes,
    ...difficultyRoutes,
    ...topicRoutes,
    ...multilingualTopicRoutes
  ];
}
