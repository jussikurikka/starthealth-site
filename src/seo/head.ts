import { articles, type Article } from '@/content/loader';
import { faqFi, faqJsonLd } from '@/seo/faq';

export const SITE = 'https://starthealth.fi';

export const HOME_TITLE = 'Työterveyshuolto pk-yrityksille | StartHealth Helsinki';
export const HOME_DESCRIPTION =
  'Lakisääteinen työterveyshuolto 1–200 hengen pk-yrityksille Helsingissä ja etänä. Kiinteä hinta, nopea hoitoonpääsy, selkeä palvelumalli.';
export const BLOG_TITLE = 'Blogi – StartHealth';
export const BLOG_DESCRIPTION =
  'Artikkeleita työterveyshuollosta, työhyvinvoinnista ja pk-yritysten arjesta.';

export const articleJsonLd = (a: Article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.frontmatter.title,
  description: a.frontmatter.meta_description,
  datePublished: a.frontmatter.last_updated,
  dateModified: a.frontmatter.last_updated,
  mainEntityOfPage: `${SITE}${a.frontmatter.target_url}`,
  author: { '@type': 'Organization', name: 'StartHealth' },
  publisher: {
    '@type': 'Organization',
    name: 'StartHealth',
    logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
  },
});

export interface RouteHead {
  path: string;
  title: string;
  description: string;
  canonical: string;
  jsonLd: Array<{ key: string; data: unknown }>;
  lastmod?: string;
}

export const getRouteHeads = (): RouteHead[] => [
  {
    path: '/',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: `${SITE}/`,
    jsonLd: [{ key: 'faq', data: faqJsonLd(faqFi) }],
  },
  {
    path: '/blog',
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    canonical: `${SITE}/blog`,
    jsonLd: [],
  },
  ...articles.map((a) => ({
    path: a.frontmatter.target_url,
    title: a.frontmatter.title,
    description: a.frontmatter.meta_description,
    canonical: `${SITE}${a.frontmatter.target_url}`,
    jsonLd: [{ key: 'article', data: articleJsonLd(a) }],
    lastmod: a.frontmatter.last_updated,
  })),
];
