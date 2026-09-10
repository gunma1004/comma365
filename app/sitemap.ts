import { MetadataRoute } from 'next';
import { REGION_DATA, type RegionItem } from '../data/regions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://comma365.netlify.app/p';

  // 1. 기본 정적 페이지 목록
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notice/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. 지역별 세부 동 경로 자동 수집
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  function collectUrls(items: RegionItem[], accumulatedPath: string[] = []) {
    for (const item of items) {
      const currentPath = [...accumulatedPath, item.id];
      dynamicRoutes.push({
        url: `${baseUrl}/areas/${currentPath.join('/')}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: currentPath.length === 1 ? 0.9 : currentPath.length === 2 ? 0.8 : 0.7,
      });

      if (item.children && item.children.length > 0) {
        collectUrls(item.children, currentPath);
      }
    }
  }

  collectUrls(REGION_DATA);

  return [...staticRoutes, ...dynamicRoutes];
}