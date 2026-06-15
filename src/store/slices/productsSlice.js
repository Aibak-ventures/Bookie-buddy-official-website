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
    search_value: sv || undefined,
    search_field: sv ? 'name' : undefined,
    min_price:    overrides.min_price    ?? activeFilters.min_price    ?? undefined,
    max_price:    overrides.max_price    ?? activeFilters.max_price    ?? undefined,
  };
}

// ── Thunks ──────────────────────────────────────────────────────────────────

/** Full search — replaces current result set. Saves base + filter params. */
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

/** Pagination only — does NOT change base params or filters. */
export const fetchProductsPageThunk = createAsyncThunk(
  'products/fetchProductsPage',
  async (url, { rejectWithValue }) => {
    try {
      const data = await fetchProductsFromUrl(url);
      return data.data;
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
  search_value: null,
  min_price:    null,
  max_price:    null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products:      [],
    next:          null,
    previous:      null,
    page_size:     15,
    loading:       false,
    error:         null,
    isLoaded:      false,   // true once a successful fetch has completed
    baseParams:    { ...initialBaseParams },
    activeFilters: { ...initialActiveFilters },
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
    clearProducts(state) {
      state.products      = [];
      state.next          = null;
      state.previous      = null;
      state.loading       = false;
      state.error         = null;
      state.isLoaded      = false;
      state.baseParams    = { ...initialBaseParams };
      state.activeFilters = { ...initialActiveFilters };
    },
  },
  extraReducers: (builder) => {
    const applyResult = (state, payload) => {
      // payload comes from fetchProductsThunk (has result + meta) or fetchProductsPageThunk (direct data)
      const result = payload.result ?? payload;
      state.loading  = false;
      state.error    = null;
      state.isLoaded = true;
      state.products  = result.data?.products ?? [];
      state.next      = result.next     ?? null;
      state.previous  = result.previous ?? null;
      state.page_size = result.page_size ?? 15;

      // Save base + filter params when doing a full search (not pagination)
      if (payload.baseParams) {
        state.baseParams = {
          ...state.baseParams,
          ...payload.baseParams,
          publicToken: payload.publicToken,
        };
      }
      if (payload.activeFilters) {
        state.activeFilters = { ...state.activeFilters, ...payload.activeFilters };
      }
    };

    builder
      .addCase(fetchProductsThunk.pending,     (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProductsThunk.fulfilled,   (s, a) => applyResult(s, a.payload))
      .addCase(fetchProductsThunk.rejected,    (s, a) => { s.loading = false; s.error = a.payload || 'Unknown error'; })
      .addCase(fetchProductsPageThunk.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProductsPageThunk.fulfilled, (s, a) => applyResult(s, a.payload))
      .addCase(fetchProductsPageThunk.rejected,  (s, a) => { s.loading = false; s.error = a.payload || 'Unknown error'; });
  },
});

export const { setBaseParams, setActiveFilters, clearProducts } = productsSlice.actions;

// ── Selectors ────────────────────────────────────────────────────────────────
export const selectProducts        = (s) => s.products.products;
export const selectProductsLoading = (s) => s.products.loading;
export const selectProductsError   = (s) => s.products.error;
export const selectProductsNext    = (s) => s.products.next;
export const selectProductsPrev    = (s) => s.products.previous;
export const selectIsLoaded        = (s) => s.products.isLoaded;
export const selectBaseParams      = (s) => s.products.baseParams;
export const selectActiveFilters   = (s) => s.products.activeFilters;

export default productsSlice.reducer;
