

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  userRequest } from "../../app/config";


const initialState = {
  addWallet: [],
  loading: false,
  error: null,
};

export const userAddWallet = createAsyncThunk(
  'pitcher/admin/add/wallet/address',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.put('/admin/funding-wallet', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const addWalletSlice = createSlice({
  name: 'addWallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAddWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userAddWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.addWallet = action.payload;
      })
      .addCase(userAddWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default addWalletSlice.reducer;
