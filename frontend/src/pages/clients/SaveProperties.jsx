import { useEffect } from "react";
import { 
  Box, 
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropertyCardHorizontal from "../../components/PropertyCardHorizontal";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom";
import { 
  removeFromWishlist, 
  addToWishlist,
  fetchWishlistProperties 
} from "../../redux/authSlice";

const SavedProperties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    savedListings = [], 
    loadingIds, 
    wishlist = [],
    loading, 
    user 
  } = useSelector((state) => state.auth || {});

  console.log("wishlist properties: ", savedListings)

  useEffect(() => {
    dispatch(fetchWishlistProperties());
  }, [dispatch]);

  const handleWishlistClick = async (propertyId) => {
    // Redirect unauthenticated users to login
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Don't show wishlist options for agents
    if (user?.role === 'agent') return;
    
    if (wishlist.includes(propertyId)) {
      await dispatch(removeFromWishlist(propertyId));
    } else {
      await dispatch(addToWishlist(propertyId));
    }

    // Refresh the saved listings
    dispatch(fetchWishlistProperties());
  };

  if (loading) {
    return (
      <Container sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box px={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Saved Properties
      </Typography>

      <Grid container spacing={3}>
        {savedListings.length > 0 ? (
          savedListings.map((property) => {
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
            )
          })
        ) : (
          ''   
        )}
      </Grid>

      {
        !loading && !savedListings.length > 0 &&(
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              No saved properties yet.
            </Alert>

            <Button
              component={Link}
              to="/listings"
              variant="outlined"
            >
              Start Exploring
            </Button>
          </Box>
        )
      }
    </Box>
  );
};

export default SavedProperties;
