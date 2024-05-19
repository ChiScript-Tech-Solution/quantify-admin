

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  approveReject: [],
  loading: false,
  error: null,
};

export const approveRejectKYC = createAsyncThunk(
  'pitcher/approve/reject/customers/kyc',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/admin/reject-funding`, payload,);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const approveRejectSlice = createSlice({
  name: 'approveReject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(approveRejectKYC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRejectKYC.fulfilled, (state, action) => {
        state.loading = false;
        state.approveReject = action.payload;
      })
      .addCase(approveRejectKYC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default approveRejectSlice.reducer;
