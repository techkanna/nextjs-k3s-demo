import { trackCTAClickParams } from "./types";

// Universal CTA tracking function
export const trackCTAClick = (params: trackCTAClickParams) => {
    const {ctaName, ctaType, additionalData} = params
    const eventData = {
        event_category: 'cta_click',
        event_label: ctaName,
        cta_type: ctaType,
        page_url: typeof window !== 'undefined' ? window.location.href : 'unknown',
        timestamp: new Date().toISOString(),
        ...additionalData
    };

    // Track with Umami analytics
    if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('cta-click', eventData);
    }

    // Log to console for debugging
    console.info(`CTA clicked: ${ctaName} (${ctaType})`, eventData);
};