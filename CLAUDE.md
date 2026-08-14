# CLAUDE.md — BookieBuddy Web (Public Shop Portal)

This file is the authoritative context for Claude Code sessions on this project.
Read this before making any changes.

---

## Project Overview

A React + Vite SPA deployed on Vercel. It serves two distinct surfaces:

| Surface | Route | Description |
|---|---|---|
| Bookie buddy official website | `/` | Static HTML website served inside a full-viewport `<iframe>` from `public/home/index.html` |
| Shop portal Home | `/shop/:shopName/:publicToken` | Public booking page for a specific rental shop |
| Shop products listing | `/shop/:shopName/:publicToken/results` | Product list with date/filter/search for that shop |
| 404 | `*` | Not found page |

---

## Key Architecture Decisions

### Bookie buddy website is an iframe
`src/pages/Home/Home.jsx` renders `/home/index.html` as an iframe — it is a completely separate static HTML website (`public/home/`). Do **not** add React sections here. The HTML website has its own nav, footer, WhatsApp float, and scripts.

### Redux for shop + product state
- `shopSlice` — shop info, services, associated shops, org mode
- `productsSlice` — product list, pagination, base params (dates/times), active filters

### Vercel Serverless Function for social crawlers
`api/meta.js` intercepts ALL `/shop/*` requests:
- **Social bots** (WhatsApp, Facebook…) → fetches shop info from API, patches `dist/index.html` with dynamic `<title>` + OG tags, returns patched HTML
- **Real browsers** → serves `dist/index.html` as-is, React Router handles routing

`vercel.json` rewrites `/shop/:shopName/:token` → `/api/meta?token=:token&path=...`

### Backend API
Production: ```https://flutter.bookiebuddy.in/api/v3/public/shops/{token}/info/```   
Development: ```https://dev.bookiebuddy.in/api/v3/public/shops/{token}/info/```

---

## Git Conventions

- Production branch: `prod` — Vercel deploys from this
- Remote: `https://github.com/Aibak-ventures/Bookie-buddy-official-website`
- **Every commit to `Current HEAD Branch` must follow this format:**
  ```
  - Fix/Imprv/Add: description line 1 
  - Fix/Imprv/Add: description line 2
  ```
- Never commit without explicit user approval

---

## Shared Hooks (always use these, never inline)

| Hook | File | Purpose |
|---|---|---|
| `usePageMeta` | `src/hooks/usePageMeta.js` | Set `<title>`, OG tags, favicons — restores on unmount |
| `useShopAnalytics` | `src/hooks/useShopAnalytics.js` | Fire GA4 `shop_page_view` / `results_page_view` |
| `useResponsiveMonths` | `src/hooks/useResponsiveMonths.js` | Returns 1 or 2 months for DayPicker based on viewport |
| `useBodyScrollLock` | `src/hooks/useBodyScrollLock.js` | Lock/unlock `body.overflow` — use instead of inline `useEffect` |
| `useMobileMenu` | `src/hooks/useMobileMenu.js` | Hamburger menu open/close + scroll lock |

## Shared Utils (always use these)

| Util | File | Exports |
|---|---|---|
| Date helpers | `src/utils/dateUtils.js` | `today`, `parseDateStr(str)` |
| WhatsApp | `src/utils/whatsapp.js` | `buildBookingWhatsAppUrl`, `shortenUrl` |
| Share | `src/utils/share.js` | `shareProduct` — Web Share API with clipboard fallback |
| Analytics | `src/hooks/useShopAnalytics.js` | `trackShopEvent(name, params)` |

---

## Analytics — GA4

Measurement ID: `G-FWPL42VC2G`

Custom events fired from shop pages:

| Event | Fired in | Parameters |
|---|---|---|
| `shop_page_view` | `ShopPage` mount | `shop_name`, `shop_token` |
| `results_page_view` | `ResultsPage` mount | `shop_name`, `shop_token` |
| `book_now_click` | `ProductCard` Book Now | `shop_name`, `shop_token`, `product_name`, `product_id` |
| `image_zoom_click` | `ProductCard` image tap | `shop_name`, `shop_token`, `product_name`, `product_id` |

Custom dimensions registered in GA4: `Shop Name`, `Shop Token`, `Product Name`.

To view per-shop data: GA4 → Explore → Blank exploration → Rows: `Shop Name`, Columns: `Event name`, Values: `Event count`.

---

## Social Media Previews

`api/meta.js` handles bot requests server-side. Fields used:
- `shop.name` → `<title>` and `og:title`
- `shop.img` → `og:image` and `twitter:image`
- Description is generated from shop name

When testing: `curl -s -A "WhatsApp/2.0" "https://bookiebuddy.in/shop/name/token" | grep og:`

---

## Favicon Behaviour

On `/shop/*` routes, `usePageMeta` swaps all favicon `<link>` tags to the shop's logo (`shop.img`), converted to a `data:` URL via canvas (bypasses cross-origin restrictions). Restores to `/home/favicon.ico` on unmount.

---

## Env Variables

| Variable | Value | Notes |
|---|---|---|
| `VITE_API_BASE_URL` | `https://flutter.bookiebuddy.in/` | Backend API. Set in Vercel dashboard too — `.env` is gitignored |

---

## What NOT to do

- ❌ Never inline `document.body.style.overflow` — use `useBodyScrollLock`
- ❌ Never duplicate `parseDateStr` or `useResponsiveMonths` — use `src/utils/dateUtils.js` and `src/hooks/useResponsiveMonths.js`
- ❌ Never add new pages to `src/pages/Home/sections/` — the home is an iframe
- ❌ Never commit to `prod` directly — use feature branch → merge
- ❌ Never commit without user approval in this session
- ❌ Never use `$` as currency symbol — always use `₹`
- ❌ Never push without user saying "push" or "commit and push"
