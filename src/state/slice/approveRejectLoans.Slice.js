

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  approveRejectLoan: [],
  loading: false,
  error: null,
};

export const approveUserWithdrawal = createAsyncThunk(
  'pitcher/approve/reject/customers/kyc',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post('/admin/approve-withdrawal', payload);
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
      .addCase(approveUserWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveUserWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        state.approveRejectLoan = action.payload;
      })
      .addCase(approveUserWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default approveRejectLoanSlice.reducer;
