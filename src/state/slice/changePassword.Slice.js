

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  changePassword: [],
  loading: false,
  error: null,
};

export const changePasswordRequest = createAsyncThunk(
  'pitcher/change/password',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.patch('/change-password', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.changePassword = action.payload;
      })
      .addCase(changePasswordRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default changePasswordSlice.reducer;
