import { SITE } from '@/lib/site';
import { FALLBACK_PENGINAPAN, FALLBACK_TOURS } from '@/lib/mockData';

export default function sitemap() {
  const baseUrl = SITE.url;

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/penginapan`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const penginapanRoutes = FALLBACK_PENGINAPAN.map((item) => ({
    url: `${baseUrl}/penginapan/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const tourRoutes = FALLBACK_TOURS.map((item) => ({
    url: `${baseUrl}/tours/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...penginapanRoutes, ...tourRoutes];
}
