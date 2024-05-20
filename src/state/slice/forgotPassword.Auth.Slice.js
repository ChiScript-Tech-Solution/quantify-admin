

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from "../../app/config";


const initialState = {
   forgotPassword: [],
  loading: false,
  error: null,
};

export const userForgotPassword = createAsyncThunk(
  'pitcher/admin/forgot/password',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await publicRequest.post('/request-reset-password', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPassword = action.payload;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default forgotPasswordSlice.reducer;
