import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from '@/constant';

export const fetchNewArrivals = createAsyncThunk('newArrivals/fetchNewArrivals', async () => {
  const response = await axios.get(`${url}api/newarrivals`);
  return response.data;
});

const newArrivalsSlice = createSlice({
  name: 'newArrivals',
  initialState: {
    newArrivals: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewArrivals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newArrivals = action.payload;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newArrivalsSlice.reducer;
