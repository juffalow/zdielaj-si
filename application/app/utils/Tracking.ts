interface TrackingEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, string | number | boolean>;
}

export function trackEvent(event: TrackingEvent): void {
  if ('gtag' in window && typeof window.gtag === 'function') {
    window.gtag('event', event.action, {
      event_category: event.category || 'engagement',
      event_label: event.label,
      value: event.value,
      ...event.customParameters,
    });
  }
}

export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent({
    action: 'form_submission',
    category: 'engagement',
    label: formName,
    value: success ? 1 : 0,
    customParameters: {
      form_name: formName,
      submission_success: success,
    },
  });
}
