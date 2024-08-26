import * as Sentry from '@sentry/node';

if (typeof process.env.SENTRY_DSN === 'string') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0.0,
  });
}
