

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  customers: [],
  loading: false,
  error: null,
};

export const fetchAllCustomers = createAsyncThunk(
  'pitcher/all/customers',
  async ({offSet, limit}, { rejectWithValue }) => {
    try {
      // const filter = phoneNumber === null ? '' : `&phoneNumber=${phoneNumber}`;
      const pages = offSet === null ? '' : `offSet=${offSet}`;
      const limits = limit === null ? '' : `&limit=${limit}`;
      const response = await userRequest.get(`/admin/fetch-users?${pages}${limits}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default customersSlice.reducer;
