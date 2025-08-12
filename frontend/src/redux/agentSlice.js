// redux/slices/agentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://real-estate-mern-li5w.onrender.com/api"
    : "http://localhost:5000/api";

export const fetchVerifiedAgents = createAsyncThunk(
  'agent/fetchVerifiedAgents',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/agents?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch agents');
    }
  }
);

// redux/agentSlice.js

export const fetchAgentStats = createAsyncThunk(
  "agent/fetchStats",
  async (agentId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const res = await axios.get(`${BASE_URL}/agent/stats/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch stats");
    }
  }
);


const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agents: [],
    stats: {},
    total: 0,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVerifiedAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVerifiedAgents.fulfilled, (state, action) => {
        state.agents = action.payload.agents;
        state.total = action.payload.total;
        state.totalPages = Math.ceil(action.payload.total / 10);
        state.loading = false;
      })
      .addCase(fetchVerifiedAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch agent stats
      .addCase(fetchAgentStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgentStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAgentStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setPage } = agentSlice.actions;
export default agentSlice.reducer;
