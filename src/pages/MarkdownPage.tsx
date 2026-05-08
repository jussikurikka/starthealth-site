import MarkdownArticle from '@/components/MarkdownArticle';
import NotFound from '@/pages/NotFound';
import type { Article } from '@/content/loader';

const MarkdownPage = ({ article }: { article: Article }) => {
  if (!article) return <NotFound />;
  return <MarkdownArticle article={article} />;
};

export default MarkdownPage;
