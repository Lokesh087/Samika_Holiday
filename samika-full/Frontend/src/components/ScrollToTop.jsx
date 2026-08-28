import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const scrollToHash = window.setTimeout(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 88, behavior: 'smooth' });
      }
    }, 250);

    return () => window.clearTimeout(scrollToHash);
  }, [pathname, hash]);

  return null;
}
