

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  userRequest } from "../../app/config";


const initialState = {
deleteAddress: [],
  loading: false,
  error: null,
};

export const deleteFundAddress = createAsyncThunk(
  'pitcher/admin/delete/wallet-funding/address',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.delete(`/admin/funding-wallet`, {
        data: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);



const deleteFundAddressSlice = createSlice({
  name: 'deleteAddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFundAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFundAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteAddress = action.payload;
      })
      .addCase(deleteFundAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default deleteFundAddressSlice.reducer;
