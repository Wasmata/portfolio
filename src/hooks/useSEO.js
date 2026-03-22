import { useEffect } from 'react';

export function useSEO({ title, description, url, type = 'website', image = 'https://www.wassidev.fr/og-image.png', schema }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
    }
    
    // 2. Update Description
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
    }

    // 3. Update Canonical URL & Open Graph URL
    if (url) {
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    }

    // 4. Update Type & Image
    if (type) document.querySelector('meta[property="og:type"]')?.setAttribute('content', type);
    if (image) {
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
      document.querySelector('meta[property="twitter:image"]')?.setAttribute('content', image);
    }

    // 5. Add/Update JSON-LD Schema.org
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.innerHTML = JSON.stringify(schema);
    }

    // We do NOT cleanup the schema on unmount intentionally for SPAs
    // so that changing from one valid page to another overwrites it,
    // which is better than removing it entirely in a React lifecycle.
  }, [title, description, url, type, image, schema]);
}
