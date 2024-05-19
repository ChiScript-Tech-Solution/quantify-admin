

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  removeDelux: [],
  loading: false,
  error: null,
};

export const removeUserDelux = createAsyncThunk(
  'pitcher/delete/delux',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/console/delete-delux`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



const removeDeluxSlice = createSlice({
  name: 'removeDelux',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeUserDelux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserDelux.fulfilled, (state, action) => {
        state.loading = false;
        state.removeDelux = action.payload;
        state.error = null;
      })
      .addCase(removeUserDelux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default  removeDeluxSlice.reducer;
