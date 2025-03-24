import { useState, useEffect } from "react";
import { Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import axios from "axios";
import PropertyCard from "../../components/PropertyCardHorizontal"; // Adjust path if needed
import properties from "../../data/properties";

const MyListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch agent's listings from backend
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/agent/listings"); // Adjust API route
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`/api/listings/${id}`);
        setListings((prevListings) => prevListings.filter((listing) => listing._id !== id));
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Listings
      </Typography>

      <Grid container spacing={4}>
        {properties.map((listing) => (
          <Grid size={{xs:12, sm:6, md:4}} key={listing.id}>
            <PropertyCard
              property={listing}
              showActions={true} // If your PropertyCard supports actions
              onEdit={`/agent/edit-property/${listing._id}`}
              onDelete={() => handleDelete(listing._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyListings;
