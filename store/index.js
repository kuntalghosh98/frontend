// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import addressReducer from './slices/addressSlice';
import recentlyViewedReducer from "./slices/recentlyViewedSlice";
import wishlistReducer from "./slices/wishlistSlice";
import bannerCardReducer from './slices/bannerCardSlice';
import newArrivalsSlice from './slices/newArrivalsSlice';
import highlightedProductsSlice from './slices/highlightedProductsSlice';
import productScrollListSlice from './slices/productScrollListSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
    cart: cartReducer,
    user: userReducer,
    address: addressReducer,
    recentlyViewed: recentlyViewedReducer,
    wishlist: wishlistReducer,
    bannerCards: bannerCardReducer,
    newArrivals: newArrivalsSlice,
    highlightedProducts: highlightedProductsSlice,
    productScrollList: productScrollListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(), // No need to explicitly add `thunk`, as it's included by default
});
