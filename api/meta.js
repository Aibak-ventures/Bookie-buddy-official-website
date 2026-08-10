/**
 * Vercel Edge Function — /api/meta
 *
 * Called only for social-crawler requests to shop routes (configured via
 * vercel.json rewrites using the "has" User-Agent condition).
 *
 * Fetches shop info from the BookieBuddy API and returns a full HTML page
 * with patched <title> and Open Graph / Twitter meta tags so link previews
 * on WhatsApp, Facebook, Slack, Twitter etc. show the shop's name and logo.
 *
 * Real browsers hit the normal SPA (index.html) and usePageMeta handles
 * meta tags client-side.
 *
 * Query params expected:
 *   ?token=<publicToken>   — the shop's public token
 *   &results=1             — (optional) set to "1" for the results page variant
 *   &path=<pathname>       — the original URL path, used to set og:url
 */

export const config = { runtime: 'edge' };

const API_BASE = 'https://dev.bookiebuddy.in';

function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function patchHtml(html, { title, description, image, url }) {
  let result = html;

  result = result.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);

  result = result.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${escHtml(title)}$2`,
  );
  result = result.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${escHtml(description)}$2`,
  );
  result = result.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1${escHtml(url)}$2`,
  );
  result = result.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    `$1${escHtml(title)}$2`,
  );
  result = result.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${escHtml(description)}$2`,
  );

  if (image) {
    const ogTag  = `<meta property="og:image" content="${escHtml(image)}" />`;
    const twTag  = `<meta name="twitter:image" content="${escHtml(image)}" />`;

    if (/<meta\s+property="og:image"/.test(result)) {
      result = result.replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/,
        `$1${escHtml(image)}$2`);
    } else {
      result = result.replace('</head>', `  ${ogTag}\n</head>`);
    }

    if (/<meta\s+name="twitter:image"/.test(result)) {
      result = result.replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
        `$1${escHtml(image)}$2`);
    } else {
      result = result.replace('</head>', `  ${twTag}\n</head>`);
    }
  }

  return result;
}

export default async function handler(request) {
  const { searchParams, origin } = new URL(request.url);
  const token      = searchParams.get('token');
  const isResults  = searchParams.get('results') === '1';
  const origPath   = searchParams.get('path') || '/';

  if (!token) {
    return new Response('Missing token', { status: 400 });
  }

  // 1. Fetch shop info
  let shop = null;
  try {
    const res = await fetch(
      `${API_BASE}/api/v3/public/shops/${token}/info/`,
      { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(5000) },
    );
    if (res.ok) {
      const json = await res.json();
      shop = json?.data?.shop ?? null;
    }
  } catch {
    // Fall through — serve unpatched HTML
  }

  // 2. Fetch the base index.html from the same deployment
  const indexRes = await fetch(`${origin}/`, { headers: { Accept: 'text/html' } });
  if (!indexRes.ok) {
    return new Response('Could not load base HTML', { status: 502 });
  }
  const originalHtml = await indexRes.text();

  if (!shop) {
    // Return unpatched HTML — defaults from index.html are fine
    return new Response(originalHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const pageUrl = `https://www.bookiebuddy.in${origPath}`;
  const meta = {
    title: isResults
      ? `${shop.name} — Available Now | BookieBuddy`
      : `${shop.name} — BookiBuddy`,
    description: isResults
      ? `See what's available to rent at ${shop.name}. Filter by date and book instantly on BookieBuddy.`
      : `Browse and book from ${shop.name} on BookieBuddy — the rental management platform.`,
    image: shop.img || null,
    url:   pageUrl,
  };

  const patchedHtml = patchHtml(originalHtml, meta);

  return new Response(patchedHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
