import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchShopInfo } from '../../services/shopApi';

/**
 * Normalize services from either org (service_ids array) or shop (id) shape
 * into a unified format: { id: string, service_name, icon, description,
 * main_service_name, display_order }
 * For orgs, id is the comma-joined service_ids string (e.g. "7,47").
 * For shops, id is the service id as a string (e.g. "47").
 */
function normalizeServices(rawServices) {
  return (rawServices || []).map((s) => {
    const isGroup = Array.isArray(s.service_ids);
    return {
      id:                isGroup ? s.service_ids.join(',') : String(s.id),
      service_name:      s.service_name,
      icon:              s.icon ?? null,
      description:       s.description ?? '',
      main_service_name: s.main_service_name ?? null,
      display_order:     s.display_order ?? 0,
    };
  });
}

export const fetchShopInfoThunk = createAsyncThunk(
  'shop/fetchShopInfo',
  async (publicToken, { rejectWithValue }) => {
    try {
      const data = await fetchShopInfo(publicToken);
      const rawServices = data.data.services || [];
      const isOrganization = Array.isArray(rawServices[0]?.service_ids);
      return {
        shop:           data.data.shop,
        services:       normalizeServices(rawServices),
        isOrganization,
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load shop');
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shop:           null,
    services:       [],
    isOrganization: false,
    loading:        false,
    error:          null,
  },
  reducers: {
    clearShop(state) {
      state.shop           = null;
      state.services       = [];
      state.isOrganization = false;
      state.loading        = false;
      state.error          = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopInfoThunk.fulfilled, (state, action) => {
        state.loading        = false;
        state.shop           = action.payload.shop;
        state.services       = action.payload.services;
        state.isOrganization = action.payload.isOrganization;
      })
      .addCase(fetchShopInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearShop } = shopSlice.actions;

// Selectors
export const selectShop           = (state) => state.shop.shop;
export const selectServices       = (state) => state.shop.services;
export const selectIsOrganization = (state) => state.shop.isOrganization;
export const selectShopLoading    = (state) => state.shop.loading;
export const selectShopError      = (state) => state.shop.error;

export default shopSlice.reducer;
