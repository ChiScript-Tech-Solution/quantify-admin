

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';


const initialState = {
  singleFunding: [],
  loading: false,
  error: null,
};

export const fetchSingleFunding = createAsyncThunk(
  'pitcher/user/funding/single',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/console/fetch-single-funding?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const singleFundingSlice = createSlice({
  name: 'singleFunding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleFunding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleFunding.fulfilled, (state, action) => {
        state.loading = false;
        state.singleFunding = action.payload;
      })
      .addCase(fetchSingleFunding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default singleFundingSlice.reducer;
