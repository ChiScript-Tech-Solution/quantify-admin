

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  inviteAdmin: [],
  loading: false,
  error: null,
};

export const inviteAdminRequest = createAsyncThunk(
  'pitcher/invite/admin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post('/console/invite-admin-user', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const inviteAdminSlice = createSlice({
  name: 'inviteAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(inviteAdminRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteAdminRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.inviteAdmin = action.payload;
      })
      .addCase(inviteAdminRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default inviteAdminSlice.reducer;
