

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  singleCustomer: [],
  loading: false,
  error: null,
};

export const fetchSingleCustomers = createAsyncThunk(
  'pitcher/single/customer',
  async ({countryCode, phoneNumber}, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/admin/fetch-single-user?phoneNumber=${phoneNumber}&countryCode=${countryCode}`,);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const singleCustomerSlice = createSlice({
  name: 'singleCustomer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCustomer = action.payload;
      })
      .addCase(fetchSingleCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default singleCustomerSlice.reducer;
