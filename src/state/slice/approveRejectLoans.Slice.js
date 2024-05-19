

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  approveRejectLoan: [],
  loading: false,
  error: null,
};

export const approveRejectUserLoan = createAsyncThunk(
  'pitcher/approve/reject/customers/kyc',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.patch('/console/approve-loan', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const approveRejectLoanSlice = createSlice({
  name: 'approveRejectLoan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(approveRejectUserLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRejectUserLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.approveRejectLoan = action.payload;
      })
      .addCase(approveRejectUserLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default approveRejectLoanSlice.reducer;
