import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { HeroUIProvider } from '@heroui/react';
import * as Sentry from '@sentry/react';
import { AuthProvider } from './utils/useAuth';
import { UploadProvider } from './utils/useUpload';
import { TrackingProvider } from './utils/useTracking';
import type { Route } from './+types/root';
import Menu from './components/menu';
import Footer from './components/footer';
import BackToOld from './components/BackToOld';
import i18n from './i18n';
import './app.css';

if (typeof import.meta.env.VITE_SENTRY_DSN === 'string')
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [],
    release: 'zdielaj-si@' + import.meta.env.VITE_APP_VERSION,
  });

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    href: '/zdielaj-si-small.png',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const language = location.pathname.split('/')[1] || 'en';

  if (i18n.resolvedLanguage !== language && location.pathname !== '/') {
    i18n.changeLanguage(location.pathname.split('/')[1]);
  }

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />

        {import.meta.env.VITE_NODE_ENV === 'production' && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-X5C0P73E1C"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-X5C0P73E1C');
              `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <UploadProvider>
              <TrackingProvider>
                <HeroUIProvider className="flex flex-col min-h-svh">
                  <Menu />
                  <main className="light flex-grow container mx-auto pt-8 pb-8 px-2 md:px-0">{children}</main>
                  <Footer />

                  <BackToOld />
                </HeroUIProvider>
              </TrackingProvider>
            </UploadProvider>
          </AuthProvider>
        </I18nextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    Sentry.captureException(error);

    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
