import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
// import properties from "../data/properties"; // Importing demo data
import PropertyCardHorizontal  from "../components/PropertyCardHorizontal";
import FilterBar from "../components/FilterBar"; // Add filtering later
import SearchBar from "../components/SearchBar";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  removeFromWishlist, 
  addToWishlist,
  fetchWishlistProperties 
} from "../redux/authSlice";
import { fetchProperties } from "../redux/propertySlice";

const Listings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties = [], loading: propertiesLoading } = useSelector((state) => state.property || {});
  const { 
    user, 
    loadingIds, 
    wishlist = [],
    loading: authLoading 
  } = useSelector((state) => state.auth);

  
  const isClient = user?.role === 'client';
  const [filteredProperties, setFilteredProperties] = useState(properties);

    // Fetch properties and wishlist when component mounts or user changes
    useEffect(() => {
      dispatch(fetchProperties());
      if (isClient) {
        dispatch(fetchWishlistProperties());
      }
    }, [dispatch, isClient, user?._id]); // Add user._id to dependency to refetch when user changes

    useEffect(() => {
      if (properties.length > 0) {
        setFilteredProperties(properties);
      }
    }, [properties]);
  
    const handleWishlistClick = (propertyId) => {
      // Redirect unauthenticated users to login
      if (!user) {
        navigate('/login');
        return;
      }
      
      // Don't show wishlist options for agents
      if (user?.role === 'agent') return;
      
      if (wishlist.includes(propertyId)) {
        dispatch(removeFromWishlist(propertyId));
      } else {
        dispatch(addToWishlist(propertyId));
      }
    };

    if (propertiesLoading || authLoading) {
      return (
        <Container sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      );
    }

  return (
    <Container sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Listings
      </Typography>

      {/* Filter Component (To Be Implemented) */}
      <FilterBar
        properties={properties} 
        setFilteredProperties={setFilteredProperties} 
      />

      <Box
        sx={{
          background: "#dee2e6",
          marginBottom: "4rem"
        }}
      >
        {/* Search Features */}
        <SearchBar showTabs={true} />
      </Box>

      {/* Grid of Listings */}
      <Grid container spacing={3}>
        {filteredProperties.map((property) => {
          const isWishlisted = wishlist.includes(property._id);
          const isWishlistLoading = loadingIds.includes(property._id);

          return(
            <Grid 
              size={{xs:12, sm:6, md:3}} 
              key={property.id}
              sx={{ 
                position: 'relative'
              }}
            >
              <PropertyCardHorizontal 
                property={property} 
                onToggleWishlist={handleWishlistClick} 
                isWishlistLoading={isWishlistLoading}
                isWishlisted={isWishlisted}
              />
            </Grid>
          );
      })}
      </Grid>

      {!propertiesLoading && filteredProperties.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
            No Properties Found.
        </Alert>
      )}

    </Container>
  );
};

export default Listings;
