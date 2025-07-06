import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logger from '../logger';

export default function Tracking() {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      'gtag' in window && (window as Window & { gtag: any }).gtag('event', 'page_view', {
        page_title: document.title,
        page_path: location.pathname + location.search,
      });
    }, 10);
  }, [location]);

  useEffect(() => {
    const clickHandler = (event: Event) => {
      const analyticsId = (event.target as HTMLElement).getAttribute('data-tracking-id');

      if ((event.target as HTMLElement).getAttribute('aria-label') === 'Download' && (event.target as HTMLElement).getAttribute('class')?.includes('lg-download')) {
        'gtag' in window && (window as any).gtag('event', 'album_download_button_click');
      }

      if (analyticsId === null) {
        return;
      }

      logger.info(`Tracking event: ${analyticsId}`);

      'gtag' in window && (window as any).gtag('event', analyticsId);
    };

    document.body.addEventListener('click', clickHandler);

    return () => {
      document.body.removeEventListener('click', clickHandler);
    };
  }, []);

  return null;
}
