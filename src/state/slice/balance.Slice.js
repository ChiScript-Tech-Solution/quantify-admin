

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  balance: [],
  loading: false,
  error: null,
};

export const fetchTotalBalance = createAsyncThunk(
  'pitcher/total/balance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get('/console/balances');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchTotalBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default balanceSlice.reducer;
