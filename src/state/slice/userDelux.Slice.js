

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  userDelux: [],
  loading: false,
  error: null,
};

export const fetchUserDelux = createAsyncThunk(
  'pitcher/user/delux',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/console/fetch-user-delux`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const userDeluxSlice = createSlice({
  name: 'userDelux',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDelux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDelux.fulfilled, (state, action) => {
        state.loading = false;
        state.userDelux = action.payload;
      })
      .addCase(fetchUserDelux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default userDeluxSlice.reducer;
