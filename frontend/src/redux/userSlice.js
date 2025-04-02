import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/api";


// Add to wishlist
export const addToWishlist = createAsyncThunk("user/addToWishlist", async (propertyId, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(`${BASE_URL}/users/wishlist/${propertyId}`, {}, config);
    toast.success("Added to wishlist!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add to wishlist");
    return rejectWithValue(error.response?.data?.message || "Failed to add to wishlist");
  }
});

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk("user/removeFromWishlist", async (propertyId, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(`${BASE_URL}/users/wishlist/${propertyId}`, config);
    toast.success("Removed from wishlist!");
    return response.data;
  } catch (error) {
    toast.error("Failed to remove from wishlist");
    return rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
  }
});

// Fetch wishlist properties
export const fetchWishlistProperties = createAsyncThunk("auth/fetchWishlist", async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${BASE_URL}/users/wishlist`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
});

const userSlice = createSlice({
  name: "user",
  initialState: { profile: null, wishlist: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch wishlist properties
      .addCase(fetchWishlistProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistProperties.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlistProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload);
        state.loading = false;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter((id) => id !== action.payload);
        state.loading = false;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
