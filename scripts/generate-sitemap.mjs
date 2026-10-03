import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://starthealth.fi';
const CONTENT_DIR = path.resolve('content');
const OUT_PATH = path.resolve('public/sitemap.xml');

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
const urls = new Map();

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
  const { data } = matter(raw);
  if (data.target_url) {
    const lm = data.last_updated instanceof Date ? data.last_updated.toISOString().slice(0, 10) : data.last_updated ? String(data.last_updated) : undefined;
    urls.set(data.target_url, lm);
  }
}

// Home and blog have no page-specific timestamp, so <lastmod> is omitted for them.
const entries = [['/', undefined], ['/blog', undefined], ...[...urls.entries()].sort((x, y) => x[0].localeCompare(y[0]))];

const urlEntries = entries
  .map(([u, lm]) => `  <url><loc>${BASE_URL}${u}</loc>${lm ? `<lastmod>${lm}</lastmod>` : ''}<changefreq>weekly</changefreq><priority>0.8</priority></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

fs.writeFileSync(OUT_PATH, sitemap, 'utf-8');
console.log(`Generated sitemap with ${entries.length} URLs at ${OUT_PATH}`);
