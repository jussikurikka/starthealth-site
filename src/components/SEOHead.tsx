import { useEffect } from 'react';

interface Props {
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
}

const SITE = 'https://starthealth.fi';

const SEOHead = ({ title, description, canonicalPath, noindex }: Props) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const url = `${SITE}${canonicalPath}`;

    const setNamedMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      const created = !el;
      const prev = el?.getAttribute('content');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return { el, created, prev };
    };
    const setPropMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      const created = !el;
      const prev = el?.getAttribute('content');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return { el, created, prev };
    };

    const restores: Array<() => void> = [];
    const apply = (r: { el: HTMLMetaElement; created: boolean; prev?: string | null }) => {
      restores.push(() => {
        if (r.created) r.el.remove();
        else if (r.prev != null) r.el.setAttribute('content', r.prev);
      });
    };

    apply(setNamedMeta('description', description));
    apply(setPropMeta('og:title', title));
    apply(setPropMeta('og:description', description));
    apply(setPropMeta('og:url', url));
    apply(setNamedMeta('twitter:title', title));
    apply(setNamedMeta('twitter:description', description));

    let robotsMeta: HTMLMetaElement | null = null;
    if (noindex) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      robotsMeta.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(robotsMeta);
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const hadCanonical = !!canonical;
    const prevHref = canonical?.href;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    return () => {
      document.title = prevTitle;
      restores.forEach((fn) => fn());
      if (robotsMeta) robotsMeta.remove();
      if (canonical && !hadCanonical) canonical.remove();
      else if (canonical && prevHref) canonical.href = prevHref;
    };
  }, [title, description, canonicalPath, noindex]);

  return null;
};

export default SEOHead;
