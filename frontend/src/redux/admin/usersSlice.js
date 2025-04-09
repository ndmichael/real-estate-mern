// redux/admin/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from './adminService';

// Async thunks
export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', 
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await adminService.getAllUsers(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your users');
    }
});

export const deleteUser = createAsyncThunk('admin/deleteUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      return await adminService.deleteUser(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete');
    }
});

// Slice
const usersSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
