// features/admin/dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";
// import { toast } from "react-toastify";

export const fetchDashboardStats = createAsyncThunk(
  "adminDashboard/getStats",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await adminService.fetchDashboardStats(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your stats');
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
