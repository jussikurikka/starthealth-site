import matter from 'gray-matter';

// Polyfill Buffer for gray-matter in browser
import { Buffer } from 'buffer';
if (typeof window !== 'undefined' && !(window as any).Buffer) {
  (window as any).Buffer = Buffer;
}

export interface ArticleFrontmatter {
  title: string;
  meta_description: string;
  primary_keyword: string;
  target_url: string;
  date?: string;
  excerpt?: string;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  body: string;
}

const files = import.meta.glob('/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const articles: Article[] = Object.entries(files)
  .map(([path, raw]) => {
    const parsed = matter(raw);
    const slug = path.replace('/content/', '').replace(/\.md$/, '');
    // Strip leading H1 to avoid duplicating the frontmatter title
    const body = parsed.content.replace(/^\s*#\s+.+\n+/, '');
    return {
      slug,
      frontmatter: parsed.data as ArticleFrontmatter,
      body,
    };
  })
  .filter((a) => a.frontmatter?.target_url);

export const articlesByUrl = new Map(
  articles.map((a) => [a.frontmatter.target_url, a])
);
