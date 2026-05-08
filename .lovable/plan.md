# Markdown-based content system

## Goal
Add a `/content` folder where each `.md` file (with YAML frontmatter) automatically becomes a routed SEO page at its `target_url`, plus a `/blog` listing page. No changes to existing pages, navigation, or design system.

## Safety review of current routing
- Router: `BrowserRouter` in `src/App.tsx` with two routes — `/` → `Index`, `*` → `NotFound`.
- All marketing sections live inside `Index.tsx` as anchor sections (`#services`, `#calculator`, etc.). Navigation links are hash anchors, not routes, so adding new top-level routes cannot collide with them.
- SPA fallback is handled by Lovable hosting — deep links like `/tyoterveys/helsinki` will serve `index.html` and let React Router resolve.
- Safest approach: insert new routes **above** the `*` catch-all and **below** `/`. Do not touch `Index`, `Navigation`, or `Footer`.

## Architecture

### 1. Content folder
- New `content/` at project root (outside `src/`) containing the 30 `.md` files.
- Frontmatter contract:
  ```yaml
  ---
  title: ...
  meta_description: ...
  primary_keyword: ...
  target_url: /tyoterveys/helsinki
  date: 2026-01-15        # optional, for blog ordering
  excerpt: ...            # optional, shown in /blog list
  ---
  ```

### 2. Build-time loading (Vite)
- Use Vite's `import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true })` to bundle all markdown at build time. No runtime fetch, no server needed.
- Add deps: `gray-matter` (frontmatter parsing) and `react-markdown` + `remark-gfm` (rendering). Tailwind Typography plugin is already installed — reuse `prose` classes.

### 3. New files
```
content/
  tyoterveys/helsinki.md
  tyoterveys/hinta.md
  ...
src/content/
  loader.ts          # parses all md, exports array { slug, frontmatter, body }
src/pages/
  MarkdownPage.tsx   # renders one article based on URL
  Blog.tsx           # lists all articles
src/components/
  MarkdownArticle.tsx  # shared layout: Navigation + <article class="prose"> + Footer
  SEOHead.tsx          # sets <title>, meta description, canonical via document API
```

### 4. Routing changes (only addition, no edits to existing routes)
In `src/App.tsx`, add two routes before the `*` catch-all:
```tsx
<Route path="/blog" element={<Blog />} />
{contentRoutes.map(r => (
  <Route key={r.target_url} path={r.target_url} element={<MarkdownPage slug={r.slug} />} />
))}
```
`contentRoutes` is generated from the loader at module load.

### 5. Design consistency
- Each markdown page reuses `Navigation` and `Footer` so the site feels identical.
- Body wrapped in `<article className="prose prose-lg max-w-3xl mx-auto py-16 px-4">` using existing semantic tokens.
- No changes to `index.css`, `tailwind.config.ts`, or any existing component.

### 6. SEO
- Per-page `<title>` and `<meta name="description">` set via a small effect in `SEOHead.tsx` (no new helmet dep needed).
- Canonical tag pointing to `https://starthealth.fi{target_url}`.
- Single H1 = frontmatter `title`; markdown body should start at H2.
- `/blog` lists title + excerpt + link, ordered by `date` desc.

## What stays untouched
- `Index.tsx`, `Hero`, `Navigation`, `Footer`, `ClientReferences`, all marketing sections.
- Existing hash anchors (`#services`, `#contact`, …) keep working.
- Design tokens, color palette, typography rules.

## Open questions before implementation
1. Where will the 30 `.md` files come from — should I scaffold the `content/` folder structure now and you paste them in, or will you upload a zip?
2. Should `/blog` be linked from the main `Navigation` / `Footer`, or remain unlinked (accessible only by URL) for now?
3. Language: are the markdown articles Finnish-only, or do you want bilingual variants (e.g. `target_url: /en/occupational-health/helsinki`)?
