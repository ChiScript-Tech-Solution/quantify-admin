

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';



const initialState = {
  userUpdate: [],
  loading: false,
  error: null,
};

export const userUpdateInfo = createAsyncThunk(
  'pitcher/user/update/info',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.patch(`/console/update-profile`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userUpdateInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdateInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userUpdate = action.payload;
      })
      .addCase(userUpdateInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default userUpdateSlice.reducer;
