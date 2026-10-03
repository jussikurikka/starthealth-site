// Vite plugin: after the production client build, builds src/entry-server.tsx for SSR
// and writes one static HTML file per route (plus sitemap.xml) into dist/.
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import type { Plugin, ResolvedConfig } from "vite";

const escAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const jsonForScript = (d: unknown) => JSON.stringify(d).replace(/</g, "\\u003c");

interface RouteHead {
  path: string;
  title: string;
  description: string;
  canonical: string;
  jsonLd: Array<{ key: string; data: unknown }>;
  lastmod?: string;
}

function buildHtml(template: string, head: RouteHead, appHtml: string): string {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="(description|robots|twitter:title|twitter:description|twitter:url)"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:(title|description|url)"[^>]*>\s*/gi, "");

  const t = escAttr(head.title);
  const d = escAttr(head.description);
  const c = escAttr(head.canonical);
  const tags = [
    `<title>${escText(head.title)}</title>`,
    `<meta name="description" content="${d}">`,
    `<link rel="canonical" href="${c}">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:url" content="${c}">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:url" content="${c}">`,
    ...head.jsonLd.map(
      (j) => `<script type="application/ld+json" data-seo="${escAttr(j.key)}">${jsonForScript(j.data)}</script>`
    ),
  ].join("\n    ");

  html = html.replace("</head>", `    ${tags}\n  </head>`);
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function buildSitemap(heads: RouteHead[], site: string): string {
  const urls = heads
    .map((h) => {
      const loc = h.path === "/" ? `${site}/` : `${site}${h.path}`;
      const lastmod = h.lastmod ? `<lastmod>${h.lastmod}</lastmod>` : "";
      return `  <url><loc>${loc}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "starthealth-prerender",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    async closeBundle() {
      if (config.build.ssr || config.mode !== "production" || process.env.PRERENDER_INNER) return;
      const { build } = await import("vite");
      const root = config.root;
      const outDir = path.resolve(root, config.build.outDir);
      const ssrOut = path.resolve(root, "node_modules/.prerender-ssr");
      const react = (await import("@vitejs/plugin-react-swc")).default;

      process.env.PRERENDER_INNER = "1";
      try {
        await build({
          configFile: false,
          root,
          mode: "production",
          logLevel: "warn",
          plugins: [react()],
          resolve: { alias: { "@": path.resolve(root, "src") } },
          ssr: { noExternal: true },
          build: {
            ssr: path.resolve(root, "src/entry-server.tsx"),
            outDir: ssrOut,
            emptyOutDir: true,
            rollupOptions: { output: { format: "esm", entryFileNames: "entry-server.mjs" } },
          },
        });
      } finally {
        delete process.env.PRERENDER_INNER;
      }

      const mod = await import(pathToFileURL(path.join(ssrOut, "entry-server.mjs")).href + `?t=${Date.now()}`);
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
      const heads: RouteHead[] = mod.getRouteHeads();

      for (const head of heads) {
        const appHtml: string = mod.render(head.path);
        const file =
          head.path === "/" ? path.join(outDir, "index.html") : path.join(outDir, head.path.replace(/^\//, ""), "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, buildHtml(template, head, appHtml), "utf-8");
      }
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap(heads, "https://starthealth.fi"), "utf-8");
      config.logger.info(`[prerender] wrote ${heads.length} routes + sitemap.xml`);
    },
  };
}
