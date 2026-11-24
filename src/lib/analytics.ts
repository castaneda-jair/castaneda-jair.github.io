import { site } from '../config/site';
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
export function initAnalytics() {
 if (!import.meta.env.PROD || !site.analyticsId) return;
 const analytics = window as AnalyticsWindow;
 analytics.dataLayer ??= [];
 analytics.gtag = function (..._args: unknown[]) { analytics.dataLayer!.push(arguments); };
 analytics.gtag('js', new Date());
 analytics.gtag('config', site.analyticsId, { send_page_view: false });
 const script = document.createElement('script');
 script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`;
 document.head.append(script);
}
export function trackPage() {
 (window as AnalyticsWindow).gtag?.('event', 'page_view', { page_location: location.href, page_title: document.title });
}
