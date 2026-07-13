/**
 * shareProduct — opens the OS native share sheet with image + text.
 *
 * Strategy:
 *  1. Fetch image blob (CORS) → navigator.share({ files, title, text }) — image share on Android/iOS.
 *  2. navigator.share({ title, text }) — text-only native sheet if image fetch fails.
 *  3. Clipboard writeText — desktop fallback.
 */
export async function shareProduct({ name, description, imageUrl }) {
  const title = name || 'Product';
  const text  = description || '';

  // Try image blob share first
  if (imageUrl && typeof navigator.share === 'function' && navigator.canShare) {
    try {
      const blob = await _fetchImageBlob(imageUrl);
      if (blob) {
        const ext  = _guessExt(imageUrl);
        const file = new File([blob], `product.${ext}`, { type: blob.type });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title, text });
          return { method: 'native-image' };
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return { method: 'native-image', error: 'cancelled' };
      // fall through to text share
    }
  }

  // Text-only native share
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text });
      return { method: 'native-text' };
    } catch (err) {
      if (err.name === 'AbortError') return { method: 'native-text', error: 'cancelled' };
      // fall through to clipboard
    }
  }

  return _clipboardFallback(text || title);
}

async function _fetchImageBlob(url) {
  const res = await fetch(url, { mode: 'cors', cache: 'force-cache' });
  if (!res.ok) return null;
  return res.blob();
}

function _guessExt(url) {
  const m = url.split('?')[0].match(/\.(\w+)$/);
  if (!m) return 'jpg';
  const e = m[1].toLowerCase();
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(e) ? e : 'jpg';
}

function _clipboardFallback(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
      .then(() => ({ method: 'clipboard' }))
      .catch(() => ({ method: 'unsupported' }));
  }
  return Promise.resolve({ method: 'unsupported' });
}
