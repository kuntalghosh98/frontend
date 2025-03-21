import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from '@/constant';

export const fetchProductScrollList = createAsyncThunk('productScrollList/fetchProductScrollList', async () => {
  const response = await axios.get(`${url}api/product-scroll-list`);
  return response.data;
});

const productScrollListSlice = createSlice({
  name: 'productScrollList',
  initialState: {
    productScrollList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductScrollList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductScrollList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productScrollList = action.payload;
      })
      .addCase(fetchProductScrollList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productScrollListSlice.reducer;
