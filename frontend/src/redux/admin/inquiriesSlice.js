import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from './adminService';

export const fetchAllInquiries = createAsyncThunk('admin/fetchAllInquiries', 
    async (_, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.user.token;
        return await adminService.getAllInquiries(token);
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch your users');
      }
});

  // Slice
const inquiriesSlice = createSlice({
    name: 'adminInquiries',
    initialState: {
      inquiries: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllInquiries.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllInquiries.fulfilled, (state, action) => {
          state.loading = false;
          state.inquiries = action.payload;
        })
        .addCase(fetchAllInquiries.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    },
  });
  
  export default inquiriesSlice.reducer;