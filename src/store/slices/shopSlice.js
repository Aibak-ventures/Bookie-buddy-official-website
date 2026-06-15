import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchShopInfo } from '../../services/shopApi';

export const fetchShopInfoThunk = createAsyncThunk(
  'shop/fetchShopInfo',
  async (publicToken, { rejectWithValue }) => {
    try {
      const data = await fetchShopInfo(publicToken);
      return {
        shop: data.data.shop,
        services: data.data.services || [],
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load shop');
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shop: null,
    services: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearShop(state) {
      state.shop = null;
      state.services = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload.shop;
        state.services = action.payload.services;
      })
      .addCase(fetchShopInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearShop } = shopSlice.actions;

// Selectors
export const selectShop         = (state) => state.shop.shop;
export const selectServices     = (state) => state.shop.services;
export const selectShopLoading  = (state) => state.shop.loading;
export const selectShopError    = (state) => state.shop.error;

export default shopSlice.reducer;
