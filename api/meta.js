/**
 * Vercel Serverless Function — /api/meta
 *
 * ALL /shop/* requests are rewritten here (vercel.json).
 *
 * - Social bots  → fetch shop info, patch index.html meta tags, return it
 * - Real browsers → serve index.html as-is (React Router handles the route)
 *
 * Reads dist/index.html from the filesystem to avoid HTTP fetch loops.
 */

import fs   from 'fs';
import path from 'path';

const API_BASE = 'https://flutter.bookiebuddy.in';

const BOT_PATTERNS = [
  'facebookexternalhit', 'facebot', 'twitterbot', 'whatsapp',
  'telegrambot', 'slackbot', 'linkedinbot', 'discordbot',
  'googlebot', 'bingbot', 'applebot', 'rogerbot', 'embedly',
  'pinterest', 'vkshare', 'w3c_validator', 'preview', 'iframely',
  'developers.google.com', 'socialflow', 'semrushbot', 'ahrefsbot',
];

function isBot(ua = '') {
  const lower = ua.toLowerCase();
  return BOT_PATTERNS.some((p) => lower.includes(p));
}

function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function patchHtml(html, { title, description, image, url }) {
  let out = html;

  const setTag = (attr, key, val) => {
    const re = new RegExp(`(<meta\\s+${attr}=["']${key}["']\\s+content=["'])[^"']*(['"])`, 'i');
    if (re.test(out)) {
      out = out.replace(re, `$1${escHtml(val)}$2`);
    } else {
      out = out.replace('</head>', `  <meta ${attr}="${key}" content="${escHtml(val)}" />\n</head>`);
    }
  };

  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escHtml(title)}</title>`);

  setTag('property', 'og:title',            title);
  setTag('property', 'og:description',      description);
  setTag('property', 'og:url',              url);
  setTag('property', 'og:type',             'website');
  setTag('name',     'description',         description);
  setTag('name',     'twitter:card',        'summary_large_image');
  setTag('name',     'twitter:title',       title);
  setTag('name',     'twitter:description', description);

  if (image) {
    setTag('property', 'og:image',      image);
    setTag('name',     'twitter:image', image);
  }

  return out;
}

// Read dist/index.html once at cold start — Vercel serves from dist/
const INDEX_PATH = path.join(process.cwd(), 'dist', 'index.html');
let baseHtml = '';
try {
  baseHtml = fs.readFileSync(INDEX_PATH, 'utf-8');
} catch {
  baseHtml = '<!doctype html><html><head><title>BookieBuddy</title></head><body><div id="root"></div></body></html>';
}

export default async function handler(req, res) {
  const ua                              = req.headers['user-agent'] || '';
  const { token, results, path: origPath } = req.query;

  if (!token) {
    res.status(400).send('Missing token');
    return;
  }

  // Real browser — serve index.html, React Router handles the route
  if (!isBot(ua)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(baseHtml);
    return;
  }

  // Bot — fetch shop data from API
  let shop = null;
  try {
    const apiRes = await fetch(
      `${API_BASE}/api/v3/public/shops/${token}/info/`,
      { headers: { Accept: 'application/json' }, redirect: 'follow' },
    );
    const json = await apiRes.json();
    console.log('[meta] shop API status:', apiRes.status, 'token:', token, 'shop:', json?.data?.shop?.name ?? 'null');
    if (apiRes.ok) {
      shop = json?.data?.shop ?? null;
    }
  } catch (e) { console.error('[meta] shop API error:', e.message); }

  if (!shop) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(baseHtml);
    return;
  }

  const isResults = results === '1';
  const pageUrl   = `https://www.bookiebuddy.in${origPath || '/'}`;

  const meta = {
    title: isResults
      ? `${shop.name} — Check Available Items`
      : `${shop.name}`,
    description: isResults
      ? `See what's available to rent at ${shop.name}. Filter by date and book instantly on BookieBuddy.`
      : `Browse and book from ${shop.name} on BookieBuddy`,
    image: shop.img || null,
    url:   pageUrl,
  };

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(patchHtml(baseHtml, meta));
}
