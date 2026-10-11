/**
 * Analytics & Event Tracking Utility for EWENBUILDS.xyz
 * 
 * - Primary: Cloudflare Web Analytics (runs natively via beacon.min.js in index.html)
 * - Secondary / Action Tracking: Custom DOM event dispatch & optional Google Analytics 4 hook
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface AnalyticsPayload {
  category?: string;
  label?: string;
  file?: string;
  projectId?: string;
  url?: string;
  [key: string]: any;
}

/**
 * Fires custom tracking event on CTA and download buttons.
 * Compatible with custom DOM listeners, Cloudflare Workers logs, and optional GA4.
 */
export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  const timestamp = new Date().toISOString();
  const eventDetail = {
    event: eventName,
    ...payload,
    timestamp,
    page: window.location.pathname,
  };

  // 1. Dispatch custom native DOM event for local listeners & debugging
  try {
    const customEvent = new CustomEvent('ewenbuilds:telemetry', {
      detail: eventDetail,
    });
    window.dispatchEvent(customEvent);
  } catch (err) {
    console.warn('CustomEvent dispatch error', err);
  }

  // 2. Optional GA4 tracking (Active only if GA4 script is uncommented in index.html)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: payload.category || 'User Interaction',
      event_label: payload.label || payload.file || 'General',
      value: 1,
      ...payload,
    });
  }

  // 3. Lightweight developer console log for transparency
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[Analytics Event] ${eventName}:`, eventDetail);
  }
}

/**
 * Helper to trigger file download with tracking and fallback UX
 */
export function triggerFileDownload(fileUrl: string, fileName: string, category: 'project_zip' | 'cad_stl' | 'resume' | 'docs') {
  trackEvent('file_download', {
    category,
    file: fileName,
    url: fileUrl,
  });

  // Create temporary link element to trigger browser download
  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
