import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  isDataAvailable:false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    isDataAvailable: (state,action) => {
      state.isDataAvailable = action.payload ;

      
    },
  },
});

export const { setUser, clearUser,isDataAvailable } = userSlice.actions;
export default userSlice.reducer;
