import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import type { Article } from '@/content/loader';
import { articleJsonLd } from '@/seo/head';

const formatFiDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}.${m}.${y}`;
};

const MarkdownArticle = ({ article }: { article: Article }) => {
  const { frontmatter, body } = article;

  useEffect(() => {
    const ld = articleJsonLd(article);
    document.head.querySelectorAll('script[data-seo="article"]').forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    script.dataset.seo = 'article';
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [article]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={frontmatter.title}
        description={frontmatter.meta_description}
        canonicalPath={frontmatter.target_url}
      />
      <Navigation />
      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <article className="container mx-auto max-w-3xl px-4 prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
          <h1 className={`text-3xl md:text-5xl font-bold text-foreground ${frontmatter.last_updated ? 'mb-3' : 'mb-8'}`}>
            {frontmatter.title}
          </h1>
          {frontmatter.last_updated && (
            <p className="not-prose text-sm text-muted-foreground mb-8">
              Päivitetty {formatFiDate(frontmatter.last_updated)}
            </p>
          )}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default MarkdownArticle;
