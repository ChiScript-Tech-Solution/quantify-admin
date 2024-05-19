
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';


const initialState = {
  singleTransaction: [],
  loading: false,
  error: null,
};

export const fetchSingleTransaction = createAsyncThunk(
  'pitcher/user/transaction/single',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/console/fetch-single-transaction?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const singleTransactionSlice = createSlice({
  name: 'singleTransaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTransaction = action.payload;
      })
      .addCase(fetchSingleTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default singleTransactionSlice.reducer;
