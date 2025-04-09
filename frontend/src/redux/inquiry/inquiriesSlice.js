// redux/inquiriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inquiryService from "./inquiryService";

// Thunks
export const fetchAllInquiries = createAsyncThunk(
  "inquiries/fetchAllInquiries",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await inquiryService.fetchAllInquiries(token)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your stats');
  }
});


export const createInquiry = createAsyncThunk(
  "inquiries/createInquiry",
  async (inquiryData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await inquiryService.createInquiry(inquiryData, token)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your stats');
  }
});

const inquiriesSlice = createSlice({
  name: "inquiries",
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

      // create inquiry
      .addCase(createInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries.push(action.payload.inquiry);
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default inquiriesSlice.reducer;
