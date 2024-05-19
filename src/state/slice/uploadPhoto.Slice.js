

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../app/config';


const initialState = {
  userPhoto: [],
  loading: false,
  error: null,
};

export const updateUserPhoto = createAsyncThunk(
  'pitcher/update/user/photo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userRequest.post('/console/update-image', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const userPhotoSlice = createSlice({
  name: 'userPhoto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.userPhoto = action.payload;
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default userPhotoSlice.reducer;
