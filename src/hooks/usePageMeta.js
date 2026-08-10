/**
 * usePageMeta — updates <title>, meta description, og:*, twitter:* and favicon
 * dynamically for a given page. Restores the original index.html values on unmount.
 *
 * Usage:
 *   usePageMeta({ title, description, image, url })
 *
 * Pass only the fields you want to override; omit the rest to leave them unchanged.
 */

const DEFAULTS = {
  title:       'All-in-One Rental Management Software in Kerala | BookieBuddy',
  description: "BookieBuddy's all-in-one rental management software in Kerala helps car rental, equipment hire, and bridal rental businesses manage bookings, agreements, inventory & finances easily. Save time, reduce errors, and grow your rental business hassle-free.",
  image:       null,   // base page has no og:image in index.html
  url:         'https://www.bookiebuddy.in/',
  favicon:     '/home/favicon.ico',
  favicon32:   '/home/images/favicon-32x32.png',
  favicon16:   '/home/images/favicon-16x16.png',
  appleTouchIcon: '/home/images/apple-touch-icon.png',
};

function getMeta(attr, value) {
  return document.querySelector(`meta[${attr}="${value}"]`);
}

function setMeta(attr, key, content) {
  let el = getMeta(attr, key);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute('content');
  el.setAttribute('content', content);
  return prev; // returns previous value so we can restore
}

function removeMeta(attr, key) {
  const el = getMeta(attr, key);
  if (el) el.remove();
}

function setFavicon(rel, href, type, sizes) {
  let el = document.querySelector(`link[rel="${rel}"]${sizes ? `[sizes="${sizes}"]` : ''}`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (type) el.type = type;
    if (sizes) el.sizes = sizes;
    document.head.appendChild(el);
  }
  const prev = el.href;
  el.href = href;
  return prev;
}

import { useEffect } from 'react';

export function usePageMeta({ title, description, image, url } = {}) {
  useEffect(() => {
    const restores = [];

    // --- title ---
    const prevTitle = document.title;
    if (title) document.title = title;

    // --- description ---
    if (description) {
      const prev = setMeta('name', 'description', description);
      restores.push(() => prev !== null ? setMeta('name', 'description', prev) : removeMeta('name', 'description'));
    }

    // --- og:title ---
    if (title) {
      const prev = setMeta('property', 'og:title', title);
      restores.push(() => prev !== null ? setMeta('property', 'og:title', prev) : removeMeta('property', 'og:title'));
    }

    // --- og:description ---
    if (description) {
      const prev = setMeta('property', 'og:description', description);
      restores.push(() => prev !== null ? setMeta('property', 'og:description', prev) : removeMeta('property', 'og:description'));
    }

    // --- og:url ---
    if (url) {
      const prev = setMeta('property', 'og:url', url);
      restores.push(() => prev !== null ? setMeta('property', 'og:url', prev) : removeMeta('property', 'og:url'));
    }

    // --- og:image / twitter:image ---
    if (image) {
      const prevOg = setMeta('property', 'og:image', image);
      restores.push(() => prevOg !== null ? setMeta('property', 'og:image', prevOg) : removeMeta('property', 'og:image'));

      const prevTw = setMeta('name', 'twitter:image', image);
      restores.push(() => prevTw !== null ? setMeta('name', 'twitter:image', prevTw) : removeMeta('name', 'twitter:image'));
    }

    // --- twitter:title ---
    if (title) {
      const prev = setMeta('name', 'twitter:title', title);
      restores.push(() => prev !== null ? setMeta('name', 'twitter:title', prev) : removeMeta('name', 'twitter:title'));
    }

    // --- twitter:description ---
    if (description) {
      const prev = setMeta('name', 'twitter:description', description);
      restores.push(() => prev !== null ? setMeta('name', 'twitter:description', prev) : removeMeta('name', 'twitter:description'));
    }

    return () => {
      // Restore title
      document.title = prevTitle;
      // Restore all metas
      restores.forEach((fn) => fn());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, url]);
}
