import { MetadataRoute } from 'next';
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
    sitemap: `${SITE_URL}/sitemapv2.xml`,
  };
}
