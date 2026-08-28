import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.kamasoul.fun';
const currentDate = new Date().toISOString().split('T')[0];

const REGIONAL_LANGUAGES = [
  'hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'ur', 'or',
  'as', 'mai', 'sat', 'ks', 'ne', 'kok', 'sd', 'doi', 'sa'
];

const TOP_INDEXABLE_LANGS = [
  'hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'ur', 'or'
];

const CATEGORIES = [
  'communication',
  'self-partner-knowledge',
  'foreplay-arousal',
  'oral-manual',
  'penetration-positions',
  'toys-enhancement',
  'advanced-exploratory',
  'aftercare-health-longevity'
];

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

// Static core routes
const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/topics', priority: '0.95', changefreq: 'daily' },
  { path: '/pathways', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' }
];

// Extract all slugs from the topics data files
const topicsDataDir = path.resolve(__dirname, '../src/data');
const topicFiles = [
  'topics-cat1.ts',
  'topics-cat2.ts',
  'topics-cat3.ts',
  'topics-cat4.ts',
  'topics-cat5.ts',
  'topics-cat6.ts',
  'topics-cat7.ts',
  'topics-cat8.ts'
];

const topicSlugs = [];

for (const file of topicFiles) {
  const filePath = path.join(topicsDataDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const slugMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
    for (const match of slugMatches) {
      if (match[1]) {
        topicSlugs.push(match[1]);
      }
    }
  }
}

console.log(`Found ${topicSlugs.length} topic slugs for sitemap.`);

function generateHreflangTags(basePath) {
  const cleanPath = basePath.split('?')[0];
  const queryIndex = basePath.indexOf('?');
  const existingQuery = queryIndex !== -1 ? basePath.substring(queryIndex + 1) : '';
  const searchParams = new URLSearchParams(existingQuery);
  searchParams.delete('lang');
  const baseQuery = searchParams.toString();

  const defaultUrl = `${BASE_URL}${cleanPath}${baseQuery ? `?${baseQuery}` : ''}`;
  let tags = `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
  tags += `    <xhtml:link rel="alternate" hreflang="en" href="${defaultUrl}" />\n`;

  for (const lang of REGIONAL_LANGUAGES) {
    const q = new URLSearchParams(baseQuery);
    q.set('lang', lang);
    tags += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${cleanPath}?${q.toString()}" />\n`;
  }
  return tags;
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

let totalUrls = 0;

// 1. Add primary static routes with full hreflang alternates
for (const route of staticRoutes) {
  xml += `  <url>
    <loc>${BASE_URL}${route.path || '/'}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${generateHreflangTags(route.path)}  </url>
`;
  totalUrls++;
}

// 2. Add multilingual static query parameter routes (?lang=...)
for (const lang of TOP_INDEXABLE_LANGS) {
  for (const route of staticRoutes) {
    const loc = `${BASE_URL}${route.path}?lang=${lang}`;
    xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>0.85</priority>
  </url>
`;
    totalUrls++;
  }
}

// 3. Add category filter query parameter routes (?category=...)
for (const cat of CATEGORIES) {
  const catPath = `/topics?category=${cat}`;
  xml += `  <url>
    <loc>${BASE_URL}${catPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
  totalUrls++;
}

// 4. Add difficulty filter query parameter routes (?difficulty=...)
for (const diff of DIFFICULTIES) {
  const diffPath = `/topics?difficulty=${diff}`;
  xml += `  <url>
    <loc>${BASE_URL}${diffPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>
`;
  totalUrls++;
}

// 5. Add all 101 topic primary routes with full hreflang alternates
for (const slug of topicSlugs) {
  const topicPath = `/topic/${slug}`;
  xml += `  <url>
    <loc>${BASE_URL}${topicPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
${generateHreflangTags(topicPath)}  </url>
`;
  totalUrls++;
}

// 6. Add multilingual topic query parameter routes (?lang=...)
for (const slug of topicSlugs) {
  for (const lang of TOP_INDEXABLE_LANGS) {
    const loc = `${BASE_URL}/topic/${slug}?lang=${lang}`;
    xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>
`;
    totalUrls++;
  }
}

xml += `</urlset>\n`;

// Write to dist/sitemap.xml if dist exists or create dist
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
const distSitemapPath = path.join(distDir, 'sitemap.xml');
fs.writeFileSync(distSitemapPath, xml, 'utf-8');

console.log(`Successfully generated sitemap.xml with ${totalUrls} indexed URLs and hreflang alternates at: ${distSitemapPath}`);
