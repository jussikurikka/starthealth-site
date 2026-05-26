import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import type { Article } from '@/content/loader';

const SITE = 'https://starthealth.fi';

const MarkdownArticle = ({ article }: { article: Article }) => {
  const { frontmatter, body } = article;

  useEffect(() => {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: frontmatter.title,
      description: frontmatter.meta_description,
      datePublished: frontmatter.date,
      dateModified: frontmatter.date,
      mainEntityOfPage: `${SITE}${frontmatter.target_url}`,
      author: { '@type': 'Organization', name: 'StartHealth' },
      publisher: {
        '@type': 'Organization',
        name: 'StartHealth',
        logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
      },
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    script.dataset.seo = 'article';
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [frontmatter.title, frontmatter.meta_description, frontmatter.date, frontmatter.target_url]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={frontmatter.title}
        description={frontmatter.meta_description}
        canonicalPath={frontmatter.target_url}
        noindex
      />
      <Navigation />
      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <article className="container mx-auto max-w-3xl px-4 prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
            {frontmatter.title}
          </h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default MarkdownArticle;
