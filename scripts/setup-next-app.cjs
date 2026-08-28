const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. src/components/TopicDetailClientWrapper.tsx
const topicDetailClientWrapper = `'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TopicItem } from '../types/topics';
import { TopicDetail } from './TopicDetail';
import { useUserProgress } from '../hooks/useUserProgress';

export function TopicDetailClientWrapper({ topic }: { topic: TopicItem }) {
  const router = useRouter();
  const {
    progress,
    toggleBookmark,
    togglePracticed,
    markAsRead,
    saveNote,
    isBookmarked,
    isPracticed,
    isRead,
    getNote
  } = useUserProgress();

  return (
    <TopicDetail
      topic={topic}
      onBack={() => {
        router.push('/topics');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onSelectTopic={(t) => {
        router.push(\`/topic/\${t.slug}\`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      isBookmarked={isBookmarked(topic.id)}
      isPracticed={isPracticed(topic.id)}
      isRead={isRead(topic.id)}
      onToggleBookmark={toggleBookmark}
      onTogglePracticed={togglePracticed}
      onMarkRead={markAsRead}
      userNote={getNote(topic.id)}
      onSaveNote={saveNote}
    />
  );
}
`;
fs.writeFileSync('src/components/TopicDetailClientWrapper.tsx', topicDetailClientWrapper, 'utf8');

// 2. src/app/topic/[slug]/page.tsx
ensureDir('src/app/topic/[slug]');
const topicSlugPage = `import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allTopics, getTopicBySlug } from '../../../data/all-topics';
import { getTopicImage, getAbsoluteImageUrl } from '../../../data/images';
import { TopicDetailClientWrapper } from '../../../components/TopicDetailClientWrapper';
import {
  generateTopicArticleSchema,
  generateTopicFaqSchema,
  generateBreadcrumbSchema,
  SITE_URL,
  SITE_NAME
} from '../../../utils/seo';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return allTopics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return {
      title: 'Topic Not Found',
      description: 'The requested guide could not be found.'
    };
  }

  const title = \`\${topic.title} — Intimacy Guide #\${topic.id}\`;
  const whyItMatters = topic.overview?.whyItMatters || topic.keyTakeaway || topic.whatItIs;
  const description = \`\${topic.subtitle}. \${whyItMatters}\`.slice(0, 158);
  const canonicalUrl = \`/topic/\${topic.slug}\`;
  const ogImageUrl = getAbsoluteImageUrl(getTopicImage(topic.id, topic.categoryId));

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: \`\${title} | \${SITE_NAME}\`,
      description,
      url: \`\${SITE_URL}/topic/\${topic.slug}\`,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: \`\${title} | \${SITE_NAME}\`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const breadcrumbList = [
    { name: 'Home', url: '/' },
    { name: 'All Guides', url: '/topics' },
    { name: topic.categoryName, url: '/topics' },
    { name: topic.title, url: \`/topic/\${topic.slug}\` }
  ];

  const topicArticleSchema = generateTopicArticleSchema(topic);
  const topicFaqSchema = generateTopicFaqSchema(topic);
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
`;
fs.writeFileSync('src/app/topic/[slug]/page.tsx', topicSlugPage, 'utf8');

// 3. src/app/pathways/page.tsx
ensureDir('src/app/pathways');
const pathwaysPage = `import type { Metadata } from 'next';
import { CuratedPathways } from '../../components/CuratedPathways';
import { curatedPathways } from '../../data/pathways';
import { generatePathwaysSchema, generateBreadcrumbSchema, SITE_URL } from '../../utils/seo';

export const metadata: Metadata = {
  title: 'Curated Intimacy Pathways & Masterclasses',
  description: 'Structured progressive intimacy pathways and learning masterclasses for couples. Explore sensory awakening, communication, positions, and erotic longevity.',
  alternates: {
    canonical: '/pathways'
  },
  openGraph: {
    title: 'Curated Intimacy Pathways & Masterclasses',
    description: 'Structured progressive intimacy pathways and learning masterclasses for couples.',
    url: \`\${SITE_URL}/pathways\`,
    type: 'website'
  }
};

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
`;
fs.writeFileSync('src/app/pathways/page.tsx', pathwaysPage, 'utf8');

// 4. src/app/about/page.tsx
ensureDir('src/app/about');
const aboutPage = `import type { Metadata } from 'next';
import { AboutView } from '../../components/AboutView';
import { generateOrganizationSchema, generateBreadcrumbSchema, SITE_URL } from '../../utils/seo';

export const metadata: Metadata = {
  title: 'About Our Intimate Philosophy & Sanctuary',
  description: 'Learn about the Velvet & Ember philosophy: bridging ancient somatic wisdom, neurochemistry, and compassionate communication for deeper couples intimacy.',
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    title: 'About Our Intimate Philosophy & Sanctuary',
    description: 'Learn about the Velvet & Ember philosophy: bridging ancient somatic wisdom, neurochemistry, and compassionate communication for deeper couples intimacy.',
    url: \`\${SITE_URL}/about\`,
    type: 'website'
  }
};

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
`;
fs.writeFileSync('src/app/about/page.tsx', aboutPage, 'utf8');

// 5. src/app/bookmarks/page.tsx
ensureDir('src/app/bookmarks');
const bookmarksPage = `'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookmarksView } from '../../components/BookmarksView';
import { useUserProgress } from '../../hooks/useUserProgress';

export default function BookmarksPage() {
  const router = useRouter();
  const {
    progress,
    toggleBookmark,
    togglePracticed
  } = useUserProgress();

  return (
    <div className="pt-16 sm:pt-20">
      <BookmarksView
        onBack={() => router.push('/')}
        onSelectTopic={(t) => router.push(\`/topic/\${t.slug}\`)}
        bookmarkedTopicIds={progress.bookmarkedTopicIds}
        practicedTopicIds={progress.practicedTopicIds}
        readTopicIds={progress.readTopicIds}
        notes={progress.notes}
        onToggleBookmark={toggleBookmark}
        onTogglePracticed={togglePracticed}
      />
    </div>
  );
}
`;
fs.writeFileSync('src/app/bookmarks/page.tsx', bookmarksPage, 'utf8');

// 6. src/app/not-found.tsx
const notFoundPage = `import { NotFoundView } from '../components/NotFoundView';

export default function NotFound() {
  return <NotFoundView />;
}
`;
fs.writeFileSync('src/app/not-found.tsx', notFoundPage, 'utf8');

// 7. src/app/sitemap.ts
const sitemapFile = `import { MetadataRoute } from 'next';
import { allTopics } from '../data/all-topics';
import { SITE_URL } from '../utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: \`\${SITE_URL}/\`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: \`\${SITE_URL}/topics\`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: \`\${SITE_URL}/pathways\`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: \`\${SITE_URL}/about\`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const topicRoutes: MetadataRoute.Sitemap = allTopics.map((topic) => ({
    url: \`\${SITE_URL}/topic/\${topic.slug}\`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...topicRoutes];
}
`;
fs.writeFileSync('src/app/sitemap.ts', sitemapFile, 'utf8');

// 8. src/app/robots.ts
const robotsFile = `import { MetadataRoute } from 'next';
import { SITE_URL } from '../utils/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/bookmarks',
        '/login',
        '/signup',
        '/account',
        '/profile',
        '/settings',
        '/admin',
        '/dashboard'
      ],
    },
    sitemap: \`\${SITE_URL}/sitemap.xml\`,
  };
}
`;
fs.writeFileSync('src/app/robots.ts', robotsFile, 'utf8');

// 9. Update package.json scripts
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts = {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');

console.log('All Next.js App Router files successfully generated!');