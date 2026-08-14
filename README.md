# BookieBuddy — Public Shop Portal

The customer-facing web portal for [BookieBuddy](https://bookiebuddy.in) — a rental management platform. Shops share a unique link; customers browse available items, filter by date, and book via WhatsApp.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| State | Redux Toolkit |
| Routing | React Router v7 |
| Styling | Plain CSS (BEM) |
| Date picker | react-day-picker v10 |
| Deployment | Vercel (SPA + Serverless Functions) |
| Analytics | Google Analytics 4 |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
npm install
```

### Environment
Create a `.env` file at the project root:
```env
VITE_API_BASE_URL=https://flutter.bookiebuddy.in/
```

### Run locally
```bash
npm run dev
```

Opens at `https://localhost:5173` (HTTPS via `@vitejs/plugin-basic-ssl`).

To test on other devices on your LAN:
```bash
# The dev server binds to 0.0.0.0 (host: true in vite.config.js)
# Visit https://<your-local-ip>:5173
```

### Build
```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

---

## Project Structure

```
src/
├── App.jsx                        # Root router
├── main.jsx                       # Entry point, Redux Provider
├── config/index.js                # API base URL from env
│
├── hooks/
│   ├── usePageMeta.js             # Dynamic <title>, OG tags, favicons
│   ├── useShopAnalytics.js        # GA4 per-shop event tracking
│   ├── useResponsiveMonths.js     # 1 or 2 DayPicker months by viewport
│   ├── useBodyScrollLock.js       # Lock body scroll when modals open
│   ├── useMobileMenu.js           # Hamburger menu state
│   ├── useRollingText.js          # Animated rotating text
│   ├── useScrollAnimations.js     # WOW.js scroll animations
│   └── useThemeSwitcher.js        # Light/dark theme toggle
│
├── utils/
│   ├── dateUtils.js               # parseDateStr, today constant
│   ├── whatsapp.js                # WhatsApp message builder + URL shortener
│   ├── share.js                   # Web Share API with clipboard fallback
│   └── helpers.js                 # scrollToSection, buildWhatsAppUrl
│
├── store/
│   ├── index.js                   # Redux store
│   └── slices/
│       ├── shopSlice.js           # Shop info, services, org mode
│       └── productsSlice.js       # Products, pagination, filters, base params
│
├── services/
│   ├── shopApi.js                 # GET /shops/{token}/info/
│   └── productsApi.js             # GET /shops/{token}/products/
│
├── pages/
│   ├── Home/
│   │   └── Home.jsx               # Full-viewport iframe → public/home/index.html
│   ├── NotFound/
│   │   └── NotFound.jsx           # 404 page
│   └── Shop/
│       ├── ShopPage.jsx           # Shop landing page (/shop/:name/:token)
│       ├── Shop.css               # All shop page styles
│       ├── components/
│       │   ├── ShopHeader.jsx     # Shop logo + name bar
│       │   ├── ShopBanner.jsx     # Hero with animated circles
│       │   ├── ShopSearchForm.jsx # Date range + time + service picker
│       │   ├── ShopInfoSection.jsx# Shop address, phone, email
│       │   ├── LoadingSpinner.jsx # Full-page loading overlay
│       │   └── ErrorMessage.jsx   # Error display with retry
│       └── Results/
│           ├── ResultsPage.jsx    # Product results (/shop/:name/:token/results)
│           ├── Results.css        # Results page styles
│           └── components/
│               ├── ProductGrid.jsx    # Grid/list container
│               ├── ProductCard.jsx    # Product card with Book Now + Share
│               ├── ImageModal.jsx     # Full-screen image zoom
│               ├── FilterSheet.jsx    # Mobile bottom-sheet filters
│               ├── ServiceFilter.jsx  # Category chip filter row
│               ├── ResultsHeader.jsx  # Grid/list view toggle
│               └── Pagination.jsx     # Prev/Next pagination
│
├── components/
│   ├── Header/                    # Sticky navbar (marketing home only)
│   ├── Footer/                    # Footer (marketing home only)
│   ├── RollingText/               # Animated text rotator
│   ├── ScrollIndicator/           # Back-to-top button
│   └── WhatsAppFloat/             # Floating WhatsApp chat button
│
└── styles/
    └── global.css                 # Main stylesheet (~5500 lines)

public/
└── home/                          # Static HTML marketing website
    ├── index.html
    ├── style.css
    └── images/

api/
└── meta.js                        # Vercel serverless function — social crawler meta tags
```

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Website Home` | Bookie Buddy official website landing page in iframe |
| `/shop/:shopName/:publicToken` | `ShopPage` | Shop landing page |
| `/shop/:shopName/:publicToken/results` | `ResultsPage` | Product listing |
| `*` | `NotFound` | 404 |

---

## How a Shop Link Works

1. Shop owner shares `bookiebuddy.in/shop/my-shop/TOKEN`
2. **Social bot** (WhatsApp/Facebook) hits the URL → `api/meta.js` intercepts, fetches shop info, returns HTML with shop name + logo as OG tags → rich link preview appears
3. **Real browser** hits the URL → gets `index.html` → React Router boots → `ShopPage` fetches shop info from Redux → renders search form
4. Customer picks dates → submits → navigates to `/results`
5. Results load, customer taps **Book Now** → WhatsApp opens with pre-filled booking message

---

## Analytics

Per-shop GA4 tracking. Events fired:

| Event | Trigger |
|---|---|
| `shop_page_view` | Shop page loads |
| `results_page_view` | Results page loads |
| `book_now_click` | Book Now CTA clicked |
| `image_zoom_click` | Product image tapped |

Each event includes `shop_name` and `shop_token` custom dimensions.

**View per-shop data:** GA4 → Explore → Blank exploration → Rows: `Shop Name`, Columns: `Event name`, Values: `Event count` + date range filter.

---

## Deployment

Deployed automatically by Vercel on push to the `prod` branch.

```bash
# Deploy
git checkout prod
git merge your-feature-branch
git push origin prod
```

**Vercel environment variables** (set in Vercel dashboard — not in `.env`):
```
VITE_API_BASE_URL = https://flutter.bookiebuddy.in/
```

---

## Key Conventions

- **Currency:** Always `₹` — never `$`
- **Scroll lock:** Use `useBodyScrollLock(condition)` — never inline `document.body.style.overflow`
- **Date parsing:** Use `parseDateStr` from `src/utils/dateUtils.js`
- **DayPicker months:** Use `useResponsiveMonths` from `src/hooks/useResponsiveMonths.js`
- **Meta tags:** Use `usePageMeta` — never manipulate `document.title` or meta tags directly
- **Analytics:** Use `trackShopEvent` from `src/hooks/useShopAnalytics.js`
- **Git commits to prod:** Must follow format `Merge PR #N From Swalihpk`
