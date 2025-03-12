// store/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '@/constant';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(`${url}api/products`);
  return response.json();
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;


import { createSelector } from '@reduxjs/toolkit';


// Selector to get all products
export const selectAllProducts = (state) => state.products.items;

// Selector to get a product by ID
export const selectProductById = createSelector(
  [selectAllProducts, (state, productId) => productId],
  (products, productId) => products.find((product) => product._id === productId)
);