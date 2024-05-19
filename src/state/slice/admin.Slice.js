

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  adminUser: [],
  loading: false,
  error: null,
};

export const fetchAdminUser = createAsyncThunk(
  'pitcher/admin/users',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get('/console/fetch-admin');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.adminUser = action.payload;
      })
      .addCase(fetchAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default adminUserSlice.reducer;
