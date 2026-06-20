import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsFromUrl } from '../../services/productsApi';

/**
 * Builds the full params object by merging baseParams + activeFilters + overrides.
 * Used both inside thunks and in components.
 */
export function buildRequestParams(baseParams, activeFilters, overrides = {}) {
  const sv = overrides.search_value ?? activeFilters.search_value;
  return {
    pickup_date:  baseParams.pickup_date  || '',
    return_date:  baseParams.return_date  || '',
    pickup_time:  baseParams.pickup_time  || undefined,
    return_time:  baseParams.return_time  || undefined,
    service_id:   overrides.service_id   ?? activeFilters.service_id  ?? undefined,
    service_ids:  overrides.service_ids  ?? activeFilters.service_ids ?? undefined,
    search_value: sv || undefined,
    min_price:    overrides.min_price    ?? activeFilters.min_price    ?? undefined,
    max_price:    overrides.max_price    ?? activeFilters.max_price    ?? undefined,
  };
}

// ── Thunks ──────────────────────────────────────────────────────────────────

/**
 * Full search — treated as a brand-new search. Replaces the page cache entirely
 * (used on initial load, service/category filter, free-text search, and "Update Search").
 */
export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async ({ publicToken, baseParams, activeFilters = {}, overrides = {} }, { rejectWithValue }) => {
    try {
      const params = buildRequestParams(baseParams, activeFilters, overrides);
      const data = await fetchProducts(publicToken, params);
      return { result: data.data, publicToken, baseParams, activeFilters };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch products');
    }
  }
);

/**
 * Advance to the next page. If that page was already fetched in this search
 * session, the reducer below resolves it from cache without calling the API
 * (the thunk only runs the network request when a new page actually needs fetching).
 */
export const goToNextPageThunk = createAsyncThunk(
  'products/goToNextPage',
  async (_, { getState, rejectWithValue }) => {
    const state = getState().products;
    const targetIndex = state.currentPageIndex + 1;

    // Already cached — no API call needed.
    if (targetIndex < state.pages.length) {
      return { cached: true, pageIndex: targetIndex };
    }

    try {
      const nextUrl = state.pages[state.currentPageIndex]?.next;
      const data = await fetchProductsFromUrl(nextUrl);
      return { cached: false, result: data.data };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load page');
    }
  }
);

// ── Slice ────────────────────────────────────────────────────────────────────

const initialBaseParams = {
  publicToken: null,
  pickup_date: null,
  return_date: null,
  pickup_time: null,
  return_time: null,
};

const initialActiveFilters = {
  service_id:   null,
  service_ids:  null,  // org: comma-separated string e.g. "7,47"
  search_value: null,
  min_price:    null,
  max_price:    null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    pages:            [], // [{ url: string|null, products: [], next: string|null }, ...] — one entry per fetched page
    currentPageIndex: -1,
    page_size:        15,
    loading:          false,
    error:            null,
    isLoaded:         false,   // true once a successful fetch has completed
    baseParams:       { ...initialBaseParams },
    activeFilters:    { ...initialActiveFilters },
  },
  reducers: {
    /** Update base search params (dates/times) without re-fetching */
    setBaseParams(state, action) {
      state.baseParams = { ...state.baseParams, ...action.payload };
    },
    /** Update active filters without re-fetching */
    setActiveFilters(state, action) {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
    },
    /** Move back to the previous page. Always served from cache — no API call. */
    goToPrevPage(state) {
      if (state.currentPageIndex > 0) {
        state.currentPageIndex -= 1;
      }
    },
    clearProducts(state) {
      state.pages            = [];
      state.currentPageIndex = -1;
      state.loading          = false;
      state.error            = null;
      state.isLoaded         = false;
      state.baseParams       = { ...initialBaseParams };
      state.activeFilters    = { ...initialActiveFilters };
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Fresh search: replace the page cache entirely ──────────────────────
      .addCase(fetchProductsThunk.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProductsThunk.fulfilled, (s, a) => {
        const { result, publicToken, baseParams, activeFilters } = a.payload;
        s.loading          = false;
        s.error            = null;
        s.isLoaded         = true;
        s.pages            = [{ url: null, products: result.data?.products ?? [], next: result.next ?? null }];
        s.currentPageIndex = 0;
        s.page_size        = result.page_size ?? 15;
        s.baseParams       = { ...s.baseParams, ...baseParams, publicToken };
        s.activeFilters    = { ...s.activeFilters, ...activeFilters };
      })
      .addCase(fetchProductsThunk.rejected,  (s, a) => { s.loading = false; s.error = a.payload || 'Unknown error'; })

      // ── Pagination: reuse cache when possible, otherwise fetch + append ────
      .addCase(goToNextPageThunk.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(goToNextPageThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.error   = null;

        if (a.payload.cached) {
          s.currentPageIndex = a.payload.pageIndex;
          return;
        }

        const { result } = a.payload;
        const fetchedUrl = s.pages[s.currentPageIndex]?.next ?? null;
        s.pages.push({ url: fetchedUrl, products: result.data?.products ?? [], next: result.next ?? null });
        s.currentPageIndex = s.pages.length - 1;
        s.page_size         = result.page_size ?? 15;
      })
      .addCase(goToNextPageThunk.rejected,  (s, a) => { s.loading = false; s.error = a.payload || 'Unknown error'; });
  },
});

export const { setBaseParams, setActiveFilters, goToPrevPage, clearProducts } = productsSlice.actions;

// ── Selectors ────────────────────────────────────────────────────────────────
export const selectProducts          = (s) => s.products.pages[s.products.currentPageIndex]?.products ?? [];
export const selectProductsLoading   = (s) => s.products.loading;
export const selectProductsError     = (s) => s.products.error;
export const selectProductsNext      = (s) => s.products.pages[s.products.currentPageIndex]?.next ?? null;
export const selectProductsPrev      = (s) => s.products.currentPageIndex > 0 ? true : null;
export const selectIsLoaded          = (s) => s.products.isLoaded;
export const selectBaseParams        = (s) => s.products.baseParams;
export const selectActiveFilters     = (s) => s.products.activeFilters;
export const selectCurrentPageIndex  = (s) => s.products.currentPageIndex;

export default productsSlice.reducer;
