/**
 * shareProduct — shares a product using the best available browser API.
 *
 * Strategy (in priority order):
 *  1. Web Share API + image File  → native share sheet with image (mobile / modern desktop)
 *  2. Web Share API (text + URL)  → native share sheet without image (fallback)
 *  3. Clipboard writeText         → copies the product URL; caller should show a toast
 *  4. Unsupported                 → nothing could be done
 *
 * @param {object} opts
 * @param {string} opts.imageUrl    — full URL of the product image to share
 * @param {string} opts.name        — product name (used as share title)
 * @param {string} [opts.description] — short description / category (no price/SKU)
 * @param {string} [opts.productUrl]  — URL to include; defaults to window.location.href
 *
 * @returns {Promise<{ method: 'native-file'|'native-text'|'clipboard'|'unsupported', error?: string }>}
 */
export async function shareProduct({ imageUrl, name, description, productUrl }) {
  const title = name || 'Product';
  const text  = description ? `${name}\n${description}` : name || '';
  const url   = productUrl || window.location.href;

  // ── 1. Native share with image file ──────────────────────────────────────
  if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function') {
    try {
      const response = await fetch(imageUrl);
      const blob     = await response.blob();
      const ext      = (blob.type.split('/')[1] || 'jpg').split('+')[0]; // e.g. "jpeg" not "jpeg+xml"
      const safeName = name.replace(/[^a-z0-9_-]/gi, '_');
      const file     = new File([blob], `${safeName}.${ext}`, { type: blob.type });
      const shareData = { title, text, files: [file] };

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return { method: 'native-file' };
      }
      // canShare returned false — image sharing not supported; fall through to text-only share
    } catch (err) {
      if (err.name === 'AbortError') {
        return { method: 'native-file', error: 'cancelled' };
      }
      // Fetch failed, CORS error, or canShare threw — fall through
    }
  }

  // ── 2. Native share, text + URL only ─────────────────────────────────────
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url });
      return { method: 'native-text' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { method: 'native-text', error: 'cancelled' };
      }
      // Share rejected for another reason — fall through
    }
  }

  // ── 3. Clipboard fallback ─────────────────────────────────────────────────
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return { method: 'clipboard' };
    } catch {
      // Clipboard permission denied — fall through
    }
  }

  return { method: 'unsupported' };
}
