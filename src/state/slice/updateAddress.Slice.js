

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  userRequest } from "../../app/config";


const initialState = {
updateAddress: [],
  loading: false,
  error: null,
};

export const updateFundAddress = createAsyncThunk(
  'pitcher/admin/add/wallet/updateAddress',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.patch(`/admin/funding-wallet`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const updateAddressSlice = createSlice({
  name: 'updateAddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateFundAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFundAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.updateAddress = action.payload;
      })
      .addCase(updateFundAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default updateAddressSlice.reducer;
