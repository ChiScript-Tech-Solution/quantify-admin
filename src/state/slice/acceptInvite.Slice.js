import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from '../../app/config';

const initialState = {
  acceptInvites: [],
  loading: false,
  error: null,
};

export const userAcceptInvites = createAsyncThunk('merchant/user/accept/invite',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await publicRequest.patch(`/console/set-password`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const acceptInvitesSlice = createSlice({
  name: 'acceptInvites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAcceptInvites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userAcceptInvites.fulfilled, (state, action) => {
        state.loading = false;
        state.acceptInvites = action.payload;
      })
      .addCase(userAcceptInvites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default acceptInvitesSlice.reducer;
