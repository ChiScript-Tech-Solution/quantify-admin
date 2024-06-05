

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  investments: [],
  loading: false,
  error: null,
};

export const fetchAllInvestments = createAsyncThunk(
  'pitcher/all/investments',
  async ({offSet, limit, status,}, { rejectWithValue }) => {
    try {
      const search = status === undefined ? '' : `&status=${status}`;
      const pages = offSet === null ? '' : `?offSet=${offSet}`;
      const limits = limit === null ? '' : `&limit=${limit}`;
      const response = await userRequest.get(`/admin/fetch-funding${pages}${limits}${search}`,);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const investmentsSlice = createSlice({
  name: 'investments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInvestments.fulfilled, (state, action) => {
        state.loading = false;
        state.investments = action.payload;
      })
      .addCase(fetchAllInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default investmentsSlice.reducer;
