import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    products: productsReducer,
  },
});
