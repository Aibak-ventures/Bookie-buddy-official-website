# BookieBuddy Web

BookieBuddy Web is the customer-facing frontend for **BookieBuddy**, a rental booking platform. It provides a marketing landing page introducing the product, and a per-shop storefront that lets end customers search for available rental products by date/time and view the matching results.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
  - [Home Page](#home-page-)
  - [Shop Page](#shop-page-shopshopnamepublictoken)
  - [Results Page](#results-page-shopshopnamepublictokenresults)
- [Routing](#routing)
- [Environment Variables](#environment-variables)
- [Prerequisites](#prerequisites)
- [Installation & Running](#installation--running)
- [Available Scripts](#available-scripts)

## Overview

The application is a single-page app (SPA) built with React and Vite. It serves two purposes:

1. **Marketing site** (`/`) — introduces BookieBuddy to prospective customers (rental shop owners) and drives signups/demos.
2. **Shop storefront** (`/shop/:shopName/:publicToken`) — a public, token-based page generated per BookieBuddy shop, where that shop's end customers can search for available rental products over a pickup/return date-time range and browse the results.

All shop and product data is fetched from a BookieBuddy backend REST API; this repository contains the frontend only.

## Tech Stack

| Category | Library |
|---|---|
| UI Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) |
| Routing | [React Router DOM v7](https://reactrouter.com/) |
| Date Handling | [date-fns](https://date-fns.org/), [react-day-picker](https://daypicker.dev/) |
| Carousels | [Swiper](https://swiperjs.com/) |
| Image Lightbox | [GLightbox](https://biati-digital.github.io/glightbox/) |
| Animations | [lottie-web](https://airbnb.io/lottie/), [WOW.js](https://wowjs.uplabs.com/) |
| Linting | [ESLint](https://eslint.org/) |

## Project Structure

```
bookie-buddy-web/
├── public/                    # Static assets served as-is
├── src/
│   ├── assets/                # Images, icons, fonts
│   ├── components/            # Shared/reusable UI components (Header, Footer, etc.)
│   ├── config/                # App configuration (e.g. API base URL)
│   ├── hooks/                 # Custom React hooks
│   ├── pages/
│   │   ├── Home/              # Marketing landing page and its sections
│   │   ├── Shop/
│   │   │   ├── ShopPage.jsx       # Shop search page
│   │   │   ├── components/        # Shop-specific components (search form, etc.)
│   │   │   └── Results/           # Search results page
│   │   └── NotFound/          # 404 page
│   ├── services/              # API client functions (shop & product fetch calls)
│   ├── store/                 # Redux store setup
│   │   └── slices/            # Redux slices (shop, products)
│   ├── styles/                # Global CSS
│   ├── App.jsx                 # Route definitions
│   └── main.jsx                 # App entry point
├── .env                        # Local environment variables (not committed)
├── index.html
├── package.json
└── vite.config.js
```

## Pages & Features

### Home Page (`/`)

The public marketing landing page for BookieBuddy. It introduces the product to potential shop owners and includes:

- **Hero section** with the core value proposition and call-to-action buttons ("Get the app", "Request a Demo")
- **Industry showcase** — an animated roll of industries BookieBuddy serves (rentals for groom/bridal wear, cars, jewelry, bikes, tools, gadgets, cycles, resorts, cameras, etc.)
- **Trust/impact stats** — key metrics (e.g. revenue boost, time saved, reduced manual effort)
- **Features** — overview of the platform's capabilities
- **Work process** — step-by-step explanation of how to get started
- **Pricing**
- **Testimonials** and **trusted clients**
- **FAQ**
- **Contact form**
- **Footer** and a floating **WhatsApp** contact button

This page is purely informational — it does not require shop or product data from the backend.

### Shop Page (`/shop/:shopName/:publicToken`)

The entry point for a specific shop's storefront, identified by:
- `shopName` — a URL-friendly slug for the shop
- `publicToken` — a public access token issued per shop, used to fetch that shop's data from the API

On load, the page fetches the shop's basic details (name, description, available service categories) and renders a **search form** so the customer can specify what they're looking for:

| Field | Required | Description |
|---|---|---|
| Pickup date | Yes | First day of the rental period; cannot be in the past |
| Pickup time | No | Time of day for pickup (`HH:mm`) |
| Return date | Yes | Last day of the rental period; must be on/after the pickup date |
| Return time | No | Time of day for return (`HH:mm`) |
| Search | No | Free-text search against product names |

The date fields use a hotel-style range calendar (both pickup and return dates are chosen from a single calendar — two months shown side-by-side on desktop, one month on mobile), with past dates disabled and `Clear` / `OK` controls to confirm the selection.

Submitting the form validates that both dates are set and navigates to the [Results Page](#results-page-shopshopnamepublictokenresults) with the chosen criteria encoded as query parameters.

### Results Page (`/shop/:shopName/:publicToken/results`)

Displays the products available for the shop matching the search criteria, read from the URL query string:

- `pickup_date`, `return_date` — required, `YYYY-MM-DD`
- `pickup_time`, `return_time` — optional, `HH:mm`
- `search_value` — optional free-text search term

On this page, customers can further refine results using:

- **Service/category filter chips** — quickly filter by product category
- **Price range filter** — minimum/maximum price inputs
- **Editable search panel** — adjust pickup/return dates and times and re-run the search ("Update Search")
- **View toggle** — switch between grid and list layouts
- **Pagination** — navigate through additional pages of results

Product data and pagination state are managed in Redux (`store/slices`) and fetched through the API client functions in `src/services/`.

## Routing

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Marketing landing page |
| `/shop/:shopName/:publicToken` | `ShopPage` | Shop search page |
| `/shop/:shopName/:publicToken/results` | `ResultsPage` | Search results page |
| `*` | `NotFound` | 404 fallback |

## Environment Variables

The app reads its configuration from a `.env` file at the project root (see `src/config/index.js`):


## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (bundled with Node.js)
- Access to a running BookieBuddy backend API (for shop/results pages)

## Installation & Running

1. **Clone the repository and move into the project folder:**
   ```bash
   cd bookie-buddy-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the project root and set the API base URL:
   ```env
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at the local URL printed in the terminal (Vite's default is `http://localhost:5173`).

5. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized build output is written to `dist/`.

6. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with hot module replacement |
| `npm run build` | Builds the app for production into the `dist/` folder |
| `npm run lint` | Runs ESLint across the project |
| `npm run preview` | Serves the production build locally for verification |
