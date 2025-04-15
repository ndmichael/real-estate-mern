// features/admin/agentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

export const getUnverifiedAgents = createAsyncThunk(
  "adminAgents/getUnverified",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await adminService.getUnverifiedAgents(token);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch your unverified agents');
    }
  }
);

export const verifyAgent = createAsyncThunk(
  "adminAgents/verify",
  async (agentId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await adminService.verifyAgent(agentId, token);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to verify agent');
    }
  }
);

const agentsSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnverifiedAgents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnverifiedAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agents = action.payload;
      })
      .addCase(getUnverifiedAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyAgent.fulfilled, (state, action) => {
        state.agents = state.agents.filter(
          (agent) => agent._id !== action.payload._id
        );
      });
  },
});

export default agentsSlice.reducer;
