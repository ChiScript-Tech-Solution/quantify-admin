

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  changeDelux: [],
  loading: false,
  error: null,
};

export const changeUserDelux = createAsyncThunk(
  'pitcher/change/delux',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/console/update-delux`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const changeDeluxSlice = createSlice({
  name: 'changeDelux',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeUserDelux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserDelux.fulfilled, (state, action) => {
        state.loading = false;
        state.changeDelux = action.payload;
        state.error = null;
      })
      .addCase(changeUserDelux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default  changeDeluxSlice.reducer;
