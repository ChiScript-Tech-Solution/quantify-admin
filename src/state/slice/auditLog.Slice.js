

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../../app/config";


const initialState = {
  auditLog: [],
  loading: false,
  error: null,
};

export const fetchAllAuditLog = createAsyncThunk(
  'pitcher/all/audit/logs',
  async ({page, limit, search}, { rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/console/fetch-audit?page=${page}&limit=${limit}&search=${search}`,);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const auditLogSlice = createSlice({
  name: 'auditLog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAuditLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAuditLog.fulfilled, (state, action) => {
        state.loading = false;
        state.auditLog = action.payload;
      })
      .addCase(fetchAllAuditLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })   
  },
});

export default auditLogSlice.reducer;
