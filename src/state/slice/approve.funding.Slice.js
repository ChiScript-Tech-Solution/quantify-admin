

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';


const initialState = {
  approveFunding: [],
  loading: false,
  error: null,
};

export const ApproveFunding = createAsyncThunk(
  'pitcher/user/funding/approve',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/admin/approve-funding`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const approveFundingSlice = createSlice({
  name: 'approveFunding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ApproveFunding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ApproveFunding.fulfilled, (state, action) => {
        state.loading = false;
        state.approveFunding = action.payload;
      })
      .addCase(ApproveFunding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default approveFundingSlice.reducer;
