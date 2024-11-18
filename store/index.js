// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import addressReducer from './slices/addressSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
    cart: cartReducer,
    user: userReducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(), // No need to explicitly add `thunk`, as it's included by default
});