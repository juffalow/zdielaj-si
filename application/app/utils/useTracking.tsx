import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router';
import useAuth from './useAuth';
import logger from '../logger';
import { trackEvent as trackEventFunction } from './Tracking';

interface TrackingContextType {
  trackEvent: (event: string, data?: Record<string, string | number | boolean>) => Promise<void>;
}

const TrackingContext = createContext<TrackingContextType>({} as TrackingContextType);

export function TrackingProvider({ children }: { children: ReactNode }): ReactNode {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if ('gtag' in window && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_path: location.pathname + location.search,
        });
      }
    }, 10);
  }, [location]);

  useEffect(() => {
    if (user) {
      if ('gtag' in window && typeof window.gtag === 'function') window.gtag('set', 'user_id', user.id);
    } else {
      if ('gtag' in window && typeof window.gtag === 'function') window.gtag('set', 'user_id', undefined);
    }
  }, [user]);

  useEffect(() => {
    const clickHandler = (event: Event) => {
      const analyticsId = (event.target as HTMLElement).getAttribute('data-tracking-id');

      if (
        (event.target as HTMLElement).getAttribute('aria-label') === 'Download' &&
        (event.target as HTMLElement).getAttribute('class')?.includes('lg-download')
      ) {
        if ('gtag' in window && typeof window.gtag === 'function')
          window.gtag('event', 'album_lightbox_download_button_click');
      }

      if (analyticsId === null) {
        return;
      }

      logger.debug(`Tracking event: ${analyticsId}`);

      if (
        event.target !== null &&
        'tagName' in event.target &&
        (event.target.tagName === 'BUTTON' ||
          (event.target.tagName === 'A' && 'role' in event.target && event.target.role === 'button'))
      ) {
        trackEventFunction({
          action: 'button_click',
          label: (event.target as HTMLElement).textContent,
          value: 1,
          customParameters: {
            analyticsId: analyticsId,
          },
        });
      }
    };

    document.body.addEventListener('click', clickHandler);

    return () => {
      document.body.removeEventListener('click', clickHandler);
    };
  }, []);

  async function trackEvent(event: string, data?: Record<string, string | number | boolean>): Promise<void> {
    logger.debug('Tracking event:', event, data);

    if ('gtag' in window && typeof window.gtag === 'function') window.gtag('event', event, data);
  }

  const memoedValue = useMemo(
    () => ({
      trackEvent,
    }),
    []
  );

  return <TrackingContext.Provider value={memoedValue}>{children}</TrackingContext.Provider>;
}

export default function useTracking() {
  return useContext(TrackingContext);
}
