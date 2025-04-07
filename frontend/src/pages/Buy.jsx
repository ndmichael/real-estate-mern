import { useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
// import properties from "../data/properties"; // Importing demo data
import PropertyCardHorizontal  from "../components/PropertyCardHorizontal";
import FilterBar from "../components/FilterBar"; // Add filtering later

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  removeFromWishlist, 
  addToWishlist,
  fetchWishlistProperties 
} from "../redux/authSlice";
import { fetchProperties } from "../redux/propertySlice";

const Buy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties = [], loading: propertiesLoading } = useSelector((state) => state.property || {});
  const buyProperties = properties.filter((p) => p.category === "buy");
  const { 
    user, 
    loadingIds, 
    wishlist = [],
    loading: authLoading 
  } = useSelector((state) => state.auth);
  
  const isClient = user?.role === 'client';

    // Fetch properties and wishlist when component mounts or user changes
    useEffect(() => {
      dispatch(fetchProperties());
      if (isClient) {
        dispatch(fetchWishlistProperties());
      }
    }, [dispatch, isClient, user?._id]); // Add user._id to dependency to refetch when user changes

  
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
        Listings for Rent
      </Typography>

      {/* Grid of Listings */}
      <Grid container spacing={2}>
        {buyProperties.map((property) => {
          const isWishlisted = wishlist.includes(property._id);
          const isWishlistLoading = loadingIds.includes(property._id);

          return(
            <Grid size={{xs:12, sm:6, md:4}} key={property.id}>
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
    </Container>
  );
};

export default Buy;
