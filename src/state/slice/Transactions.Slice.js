

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';


const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchUserTransactions = createAsyncThunk(
  'pitcher/investment/transactions',
  async ({offSet, limit, status}, { rejectWithValue }) => {
    try {
      const filt = status === undefined ? '' : `&status=${status}`;
      const response = await userRequest.get(`/admin/fetch-transactions?offSet=${offSet}&limit=${limit}${filt}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default transactionsSlice.reducer;
