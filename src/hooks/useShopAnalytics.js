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

const GA_ID = 'G-FWPL42VC2G';

function gtag(...args) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Fire a GA4 event with shop context baked in.
 * @param {string} eventName
 * @param {object} params
 */
export function trackShopEvent(eventName, params = {}) {
  gtag('event', eventName, {
    send_to: GA_ID,
    ...params,
  });
}

/**
 * Hook — call once at the top of ShopPage or ResultsPage.
 * Fires a page_view event when shop data is available.
 *
 * @param {'shop'|'results'} pageType
 * @param {{ name?: string, public_token?: string }} shop
 */
import { useEffect, useRef } from 'react';

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
