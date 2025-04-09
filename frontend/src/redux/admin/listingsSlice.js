// features/admin/listingsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

export const getAllListings = createAsyncThunk(
  "adminListings/getAll",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllListings();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteListing = createAsyncThunk(
  "adminListings/delete",
  async (listingId, thunkAPI) => {
    try {
      return await adminService.deleteListing(listingId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = action.payload;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(
          (listing) => listing._id !== action.payload._id
        );
      });
  },
});

export default listingsSlice.reducer;
