/**
 * useShopAnalytics — per-shop GA4 event tracking.
 *
 * Every event includes shop_name and shop_token as custom dimensions
 * so you can filter/group by shop in GA4 Explorations.
 *
 * Events tracked:
 *   shop_page_view     — user lands on /shop/:name/:token
 *   results_page_view  — user lands on /shop/:name/:token/results
 *   book_now_click     — user clicks the Book Now (WhatsApp) CTA
 *   image_zoom_click   — user opens the product image zoom modal
 */

import { useEffect, useRef } from 'react';

const GA_ID = 'G-FWPL42VC2G';

/**
 * Fire a GA4 event. Uses window.gtag defined by the snippet in index.html.
 */
export function trackShopEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, {
    send_to: GA_ID,
    ...params,
  });
}

/**
 * Hook — fires a page_view event once when shop data becomes available.
 * Safe to call before shop loads — waits until shop.name exists.
 *
 * @param {'shop'|'results'} pageType
 * @param {{ name?: string, public_token?: string, id?: string }} shop
 */
export function useShopAnalytics(pageType, shop) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!shop?.name || firedRef.current) return;
    firedRef.current = true;

    const eventName = pageType === 'results' ? 'results_page_view' : 'shop_page_view';

    trackShopEvent(eventName, {
      shop_name:  shop.name,
      shop_token: shop.public_token || shop.id || '',
      page_title: document.title,
      page_path:  window.location.pathname,
    });
  }, [shop, pageType]);
}
