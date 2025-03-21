// store/slices/bannerCardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from '@/constant';

export const fetchBannerCards = createAsyncThunk(
  'bannerCards/fetchBannerCards',
  async () => {
    const response = await axios.get(`${url}api/banners`);
    return response.data;
  }
);

const bannerCardSlice = createSlice({
  name: 'bannerCards',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBannerCards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBannerCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bannerCardSlice.reducer;
