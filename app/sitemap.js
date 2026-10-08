import { SITE } from '@/lib/site';
import { FALLBACK_PENGINAPAN, FALLBACK_TOURS, FALLBACK_JEEP, FALLBACK_DESTINASI } from '@/lib/mockData';

export default function sitemap() {
  const baseUrl = SITE.url;

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/penginapan`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/jeep-dieng`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/jelajahi-dieng`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/tours`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/availability`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const penginapanRoutes = FALLBACK_PENGINAPAN.map((item) => ({
    url: `${baseUrl}/penginapan/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const jeepRoutes = FALLBACK_JEEP.map((item) => ({
    url: `${baseUrl}/jeep-dieng/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const destinasiRoutes = FALLBACK_DESTINASI.map((item) => ({
    url: `${baseUrl}/jelajahi-dieng/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const tourRoutes = FALLBACK_TOURS.map((item) => ({
    url: `${baseUrl}/tours/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...penginapanRoutes, ...jeepRoutes, ...destinasiRoutes, ...tourRoutes];
}
