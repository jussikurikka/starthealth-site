import { useEffect } from 'react';

interface Props {
  title: string;
  description: string;
  canonicalPath: string;
}

const SITE = 'https://starthealth.fi';

const SEOHead = ({ title, description, canonicalPath }: Props) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    const desc = setMeta('description', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const hadCanonical = !!canonical;
    const prevHref = canonical?.href;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE}${canonicalPath}`;

    return () => {
      document.title = prevTitle;
      if (canonical && !hadCanonical) canonical.remove();
      else if (canonical && prevHref) canonical.href = prevHref;
    };
  }, [title, description, canonicalPath]);

  return null;
};

export default SEOHead;
