import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Tracking() {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      'gtag' in window && (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_path: location.pathname + location.search,
      });
    }, 10);
  }, [location]);

  useEffect(() => {
    const clickHandler = (event: any) => {
      const analyticsId = event.target.getAttribute('data-tracking-id');

      if (event.target.getAttribute('aria-label') === 'Download' && event.target.getAttribute('class').includes('lg-download')) {
        'gtag' in window && (window as any).gtag('event', 'album_download_button_click');
      }

      if (analyticsId === null) {
        return;
      }

      'gtag' in window && (window as any).gtag('event', analyticsId);
    };

    document.body.addEventListener('click', clickHandler);

    return () => {
      document.body.removeEventListener('click', clickHandler);
    };
  }, []);

  return null;
}
