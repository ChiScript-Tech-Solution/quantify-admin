

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';


const initialState = {
  loans: [],
  loading: false,
  error: null,
};

export const fetchUserLoans = createAsyncThunk(
  'pitcher/user/loans',
  async ({page, limit, status }, { rejectWithValue }) => {
    try {
      const search = status === '' ? '' : `&status=${status}`;
      const next = page === "" ? '' : `?offset=${page}`;
      const pageSize = limit === '' ? '' : `&limit=${limit}`;
      const response = await userRequest.get(`/admin/fetch-withdrawals${next}${pageSize}${search}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchUserLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default loansSlice.reducer;
