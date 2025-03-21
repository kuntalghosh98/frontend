import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from '@/constant';

export const fetchHighlightedProducts = createAsyncThunk('highlightedProducts/fetchHighlightedProducts', async () => {
  const response = await axios.get(`${url}api/highlighted-products`);
  return response.data;
});

const highlightedProductsSlice = createSlice({
  name: 'highlightedProducts',
  initialState: {
    highlightedProducts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighlightedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHighlightedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.highlightedProducts = action.payload;
      })
      .addCase(fetchHighlightedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default highlightedProductsSlice.reducer;
