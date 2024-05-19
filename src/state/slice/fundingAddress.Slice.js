

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  userRequest } from "../../app/config";


const initialState = {
    fundAddress: [],
  loading: false,
  error: null,
};

export const fetchFundAddress = createAsyncThunk(
  'pitcher/admin/add/wallet/fundAddress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get('/user/fetch-funding-walllet',);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const fundAddressSlice = createSlice({
  name: 'fundAddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFundAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFundAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.fundAddress = action.payload;
      })
      .addCase(fetchFundAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default fundAddressSlice.reducer;
