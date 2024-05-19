

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  addDelux: [],
  loading: false,
  error: null,
};

export const addDeluxToUser = createAsyncThunk(
  'pitcher/add/delux',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/console/delux`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const addDeluxSlice = createSlice({
  name: 'addDelux',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDeluxToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDeluxToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.addDelux = action.payload;
        state.error = null;
      })
      .addCase(addDeluxToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default  addDeluxSlice.reducer;
