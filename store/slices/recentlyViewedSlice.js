import { createSlice } from "@reduxjs/toolkit";

const MAX_RECENTLY_VIEWED = 12; // Max 12 products in queue

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState: [],
  reducers: {
    addRecentlyViewed: (state, action) => {
      const productId = action.payload;
      // Remove if already exists
      state = state.filter((id) => id !== productId);
      // Add to the front of the queue
      state.unshift(productId);
      // Keep max 12 products
      return state.slice(0, MAX_RECENTLY_VIEWED);
    },
  },
});

export const { addRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
