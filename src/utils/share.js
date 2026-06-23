/**
 * shareProduct — shares a product using the best available browser API.
 *
 * Strategy (in priority order):
 *  1. Web Share API (text + URL) — called BEFORE any await to preserve the
 *     browser's transient user-gesture activation on mobile. Opens the native
 *     share sheet (WhatsApp, Telegram, Instagram, etc.) on Android & iOS.
 *     Requires a secure context (HTTPS / localhost).
 *  2. Clipboard writeText — for desktop browsers without navigator.share
 *     (e.g. Firefox). Copies the product URL; caller shows a "Copied!" toast.
 *  3. Unsupported — nothing could be done.
 *
 * @param {object} opts
 * @param {string} opts.name            — product name (share title)
 * @param {string} [opts.description]   — short description / category
 * @param {string} [opts.productUrl]    — URL to share; defaults to window.location.href
 *
 * @returns {Promise<{ method: 'native-text'|'clipboard'|'unsupported', error?: string }>}
 */
export async function shareProduct({ name, description, productUrl }) {
  const title = name || 'Product';
  const text  = description ? `${name}\n${description}` : name || '';
  const url   = productUrl || window.location.href;

  // ── 1. Native share (text + URL) ─────────────────────────────────────────
  // Must be called BEFORE any await so that the browser's transient user
  // activation (user gesture) is still valid. On mobile this opens the system
  // share sheet; WhatsApp/Telegram/etc pre-fill with the product details.
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url });
      return { method: 'native-text' };
    } catch (err) {
      if (err.name === 'AbortError') {
        // User dismissed the share sheet — not an error.
        return { method: 'native-text', error: 'cancelled' };
      }
      // NotAllowedError, SecurityError, etc. — fall through to clipboard.
    }
  }

  // ── 2. Clipboard fallback ─────────────────────────────────────────────────
  // Handles desktop browsers that don't support navigator.share (e.g. Firefox).
  // Requires a secure context (HTTPS / localhost).
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return { method: 'clipboard' };
    } catch {
      // Clipboard permission denied — fall through.
    }
  }

  return { method: 'unsupported' };
}
