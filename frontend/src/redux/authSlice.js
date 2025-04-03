import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/api";

// Async Thunks for Register, Login, Logout
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    localStorage.setItem("user", JSON.stringify(response.data));

    toast.success("Regsitration successful!");

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    localStorage.setItem("user", JSON.stringify(response.data));

    toast.success(`${response.data.user.firstName} have been logged in!`);

    return response.data;
  } catch (error) {
    toast.success("login failed!");
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("user");
  toast.info("You have been logout, please login");
  return null;
});

// Get user profile
export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${BASE_URL}/users/profile`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
  }
});

// Update user profile
export const updateUserProfile = createAsyncThunk("user/updateProfile", async (profileData, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${BASE_URL}/users/profile`, profileData, config);
    toast.success("Profile updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update profile");
    return rejectWithValue(error.response?.data?.message || "Failed to update profile");
  }
});

// Add to wishlist
export const addToWishlist = createAsyncThunk("user/addToWishlist", async (propertyId, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(`${BASE_URL}/wishlist/${propertyId}`, {}, config);
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
    const response = await axios.delete(`${BASE_URL}/wishlist/${propertyId}`, config);
    toast.success("Removed from wishlist!");
    return response.data;
  } catch (error) {
    toast.error("Failed to remove from wishlist");
    console.log("error: ", error);
    return rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
  }
});

// Fetch wishlist properties
export const fetchWishlistProperties = createAsyncThunk("auth/fetchWishlist", async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${BASE_URL}/wishlist`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: JSON.parse(localStorage.getItem("user")) || null, 
    loading: false, 
    loadingIds: [],  // Track loading per property ID
    error: null,
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || []  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })

      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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
      .addCase(addToWishlist.pending, (state, action) => {
        state.loadingIds.push(action.meta.arg); // Add property ID to loading list
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loadingIds = state.loadingIds.filter(id => id !== action.meta.arg);
        if (state.user) {
          state.user.savedListings = action.payload.savedListings;
          // localStorage.setItem("user", JSON.stringify(state.user));
          localStorage.setItem("wishlist", JSON.stringify(action.payload.savedListings));
        }
        state.wishlist = action.payload.savedListings; // Ensure UI updates
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loadingIds = state.loadingIds.filter(id => id !== action.meta.arg);
        state.error = action.payload;
      })

      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state, action) => {
        state.loadingIds.push(action.meta.arg);
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loadingIds = state.loadingIds.filter(id => id !== action.meta.arg);
        if (state.user) {
          state.user.savedListings = action.payload.savedListings;
          localStorage.setItem("wishlist", JSON.stringify(action.payload.savedListings));
        }
        state.wishlist = action.payload.savedListings; // Ensure UI updates
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loadingIds = state.loadingIds.filter(id => id !== action.meta.arg);
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
