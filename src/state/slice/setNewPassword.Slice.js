import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from '../../app/config';

const initialState = {
  newPassword: [],
  loading: false,
  error: null,
};

export const userNewPassword = createAsyncThunk('merchant/user/set/new/password',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await publicRequest.patch(`/console/reset-password`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const newPasswordSlice = createSlice({
  name: 'newPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userNewPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.newPassword = action.payload;
      })
      .addCase(userNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default newPasswordSlice.reducer;
