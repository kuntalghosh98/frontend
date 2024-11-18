import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [], // List of all addresses
  selectedAddress: null, // The currently selected address
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    
    //   // Automatically select default address if available
      const defaultAddress = state.addresses.find(address => address.isDefault===true);
      if (defaultAddress) {
        console.log(defaultAddress)
        state.selectedAddress = defaultAddress;
      }
    },
    selectAddress: (state, action) => {
        
      const selected = state.addresses.find(address => address._id === action.payload);
      if (selected) {
        console.log("selected add111")
        state.selectedAddress = selected;
      }
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
      // If it's the first address or marked as default, set as selected
      if (action.payload.isDefault || state.addresses.length === 1) {
        state.selectedAddress = action.payload;
      }
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(address => address.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
        // Update selected if this address was selected
        if (state.selectedAddress?.id === action.payload.id) {
          state.selectedAddress = action.payload;
        }
      }
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(address => address.id !== action.payload);
      // If the selected address is removed, reset selectedAddress
      if (state.selectedAddress?.id === action.payload) {
        state.selectedAddress = null;
        // Optionally, you can select a new default or first address
        const defaultAddress = state.addresses.find(address => address.isDefault);
        state.selectedAddress = defaultAddress || state.addresses[0] || null;
      }
    },
  },
});

export const { setAddresses, selectAddress, addAddress, updateAddress, removeAddress } = addressSlice.actions;

export default addressSlice.reducer;
