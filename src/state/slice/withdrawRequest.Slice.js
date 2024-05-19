import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';

const initialState = {
  approveWithdraw: [],
  loading: false,
  error: null,
};

export const approvedWithdrawal = createAsyncThunk('merchant/user/approve/withdrawal',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/console/approve-withdraw`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const approveWithdrawSlice = createSlice({
  name: 'approveWithdraw',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(approvedWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approvedWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        state.approveWithdraw = action.payload;
      })
      .addCase(approvedWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default approveWithdrawSlice.reducer;
