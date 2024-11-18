// // store/slices/cartSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Thunks for async operations
// export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
//   const response = await axios.get(`/api/cart/${userId}`);
//   return response.data;
// });

// export const addToCart = createAsyncThunk('cart/addToCart', async (item) => {
//   const response = await axios.post('/api/cart', item);
//   return response.data;
// });

// export const updateCart = createAsyncThunk('cart/updateCart', async (item) => {
//   const response = await axios.put(`/api/cart/${item.id}`, item);
//   return response.data;
// });

// export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId) => {
//   await axios.delete(`/api/cart/${itemId}`);
//   return itemId;
// });

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(updateCart.fulfilled, (state, action) => {
//         const index = state.items.findIndex(item => item.id === action.payload.id);
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.items = state.items.filter(item => item.id !== action.payload);
//       });
//   },
// });

// export default cartSlice.reducer;
























// store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
    updateCart(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCartItems, updateCart, removeFromCart } = cartSlice.actions;

export const selectCartCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};


export default cartSlice.reducer;
