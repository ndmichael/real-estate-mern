import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://real-estate-mern-li5w.onrender.com/api"
    : "http://localhost:5000/api";

export const fetchProperties = createAsyncThunk(
    'property/fetchProperties',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/properties`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch properties');
      }
    }
  );

  export const fetchMyProperties = createAsyncThunk(
    'property/fetchMyProperties',
    async (_, { rejectWithValue, getState }) => {
      try {
        // Retrieve the authentication token from the state
        const token = getState().auth.user.token;
  
        // Configure the request headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Make the GET request to the backend endpoint
        const response = await axios.get(`${BASE_URL}/properties/my-listings`, config);
        console.log("Fetched Properties from API:", response.data);
        return response.data;
      } catch (error) {
        // Handle errors and provide a meaningful message
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch your properties');
      }
    }
  );

  // Async Thunk for fetching a property by ID
    export const fetchPropertyById = createAsyncThunk(
        "properties/fetchById",
        async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/properties/${id}`);
            if (!response.ok) throw new Error("Failed to fetch property");
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
        }
    );
  

  export const addProperty = createAsyncThunk(
    'property/addProperty',
    async (propertyData, { rejectWithValue, getState }) => {
      try {
        // Retrieve the authentication token from the state
        const token = getState().auth.user.token;
        
        // Configure the request headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(`${BASE_URL}/properties`, propertyData, config);
        toast.success("Property Added !");
        return response.data;
      } catch (error) {
        toast.error("Failed to add property");
        return rejectWithValue(error.response?.data?.message || 'Failed to add property');
      }
    }
  );

  export const updateProperty = createAsyncThunk(
    'property/updateProperty',
    async ({ id, propertyData }, { rejectWithValue, getState }) => {
      try {
        // Retrieve the authentication token from the state
        const token = getState().auth.user.token;
  
        // Configure the request headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(`${BASE_URL}/properties/${id}`, propertyData, config);
        toast.success("Property updated successfully!");

        return response.data;
      } catch (error) {
        toast.error("Failed to update property");
        return rejectWithValue(error.response?.data?.message || 'Failed to update property');
      }
    }
  );


  export const deleteProperty = createAsyncThunk(
    'property/deleteProperty',
    async (id, { rejectWithValue, getState  }) => {
      try {
        // Retrieve the authentication token from the state
        const token = getState().auth.user.token;
  
        // Configure the request headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`${BASE_URL}/properties/${id}`, config);
        toast.error("Property deleted successfully !");
        return id;
      } catch (error) {
        toast.error("Failed to delete property");
        return rejectWithValue(error.response?.data?.message || 'Failed to delete property');
      }
    }
  );


  const propertySlice = createSlice({
    name: 'property',
    initialState: {
      properties: [],
      myProperties: [],
      property: {}, 
      loading: false,
      error: null,
    },
    reducers: {
      // Synchronous reducers can be added here if needed
    },
    extraReducers: (builder) => {
      builder
        // Fetch Properties
        .addCase(fetchProperties.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProperties.fulfilled, (state, action) => {
          state.properties = action.payload;
          state.loading = false;
        })
        .addCase(fetchProperties.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Fetch property by ID
        .addCase(fetchPropertyById.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchPropertyById.fulfilled, (state, action) => {
            state.loading = false;
            state.property = action.payload;
          })
          .addCase(fetchPropertyById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

         // Handle fetchMyProperties lifecycle
        .addCase(fetchMyProperties.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMyProperties.fulfilled, (state, action) => {
            state.myProperties = action.payload;
            state.loading = false;
        })
        .addCase(fetchMyProperties.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
  
        // Add Property
        .addCase(addProperty.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addProperty.fulfilled, (state, action) => {
          state.properties.push(action.payload);
          state.loading = false;
        })
        .addCase(addProperty.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Update Property
        .addCase(updateProperty.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProperty.fulfilled, (state, action) => {
          const index = state.properties.findIndex((property) => property.id === action.payload.id);
          if (index !== -1) {
            state.properties[index] = action.payload;
          }
          state.loading = false;
        })
        .addCase(updateProperty.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Delete Property
        .addCase(deleteProperty.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteProperty.fulfilled, (state, action) => {
          state.myProperties = state.myProperties.filter((property) => property.id !== action.payload);
          state.loading = false;
        })
        .addCase(deleteProperty.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default propertySlice.reducer;

