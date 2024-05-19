

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';


const initialState = {
  singleWithdraw: [],
  loading: false,
  error: null,
};

export const fetchSingleWithdraw = createAsyncThunk(
  'pitcher/user/withdraw/single',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/console/fetch-single-withdraw?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const singleWithdrawSlice = createSlice({
  name: 'singleWithdraw',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleWithdraw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleWithdraw.fulfilled, (state, action) => {
        state.loading = false;
        state.singleWithdraw = action.payload;
      })
      .addCase(fetchSingleWithdraw.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default singleWithdrawSlice.reducer;
