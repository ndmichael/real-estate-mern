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
  async ({inquiryData}, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await inquiryService.createInquiry(inquiryData, token)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your stats');
  }
});

export const fetchAgentInquiries = createAsyncThunk(
  'inquiries/fetchAgentInquiries',
  async (agentId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await inquiryService.fetchAgentInquiries(token, agentId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch agent inquiries');
    }
  }
);

export const replyToInquiry = createAsyncThunk(
  'inquiries/replyToInquiry',
  async ({ id, reply }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await inquiryService.replyToInquiry({ id, reply }, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reply');
    }
  }
);

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
      })

      .addCase(fetchAgentInquiries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgentInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchAgentInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reply to Inquiry
    .addCase(replyToInquiry.pending, (state) => {
      state.loading = true;
    })
    .addCase(replyToInquiry.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.inquiries.findIndex(i => i._id === action.payload._id);
      if (index !== -1) {
        state.inquiries[index] = action.payload; // updated inquiry with reply
      }
      state.error = null;
    })
    .addCase(replyToInquiry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default inquiriesSlice.reducer;
