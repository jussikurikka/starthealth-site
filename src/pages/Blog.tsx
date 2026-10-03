import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { articles } from '@/content/loader';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/seo/head';

const Blog = () => {
  const sorted = [...articles].sort((a, b) =>
    (b.frontmatter.last_updated ?? '').localeCompare(a.frontmatter.last_updated ?? '')
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={BLOG_TITLE}
        description={BLOG_DESCRIPTION}
        canonicalPath="/blog"
      />
      <Navigation />
      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-10">Blogi</h1>
          <ul className="space-y-8">
            {sorted.map((a) => (
              <li key={a.slug} className="border-b border-border pb-6">
                <Link
                  to={a.frontmatter.target_url}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {a.frontmatter.title}
                </Link>
                {a.frontmatter.excerpt && (
                  <p className="mt-2 text-muted-foreground">{a.frontmatter.excerpt}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
