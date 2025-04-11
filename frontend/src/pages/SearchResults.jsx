import { useEffect } from "react";
import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
// import properties from "../data/properties"; // Importing demo data
import PropertyCardHorizontal  from "../components/PropertyCardHorizontal";
import SearchBar from "../components/SearchBar";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchPropertiesQuery } from '../redux/searchPropertiesApi';
import { 
  removeFromWishlist, 
  addToWishlist,
  fetchWishlistProperties 
} from "../redux/authSlice";


const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [triggerSearch, { data=[], isLoading, error }] = useLazySearchPropertiesQuery();
  const { 
    user, 
    loadingIds, 
    wishlist = [],
    loading: authLoading 
  } = useSelector((state) => state.auth);

  const isClient = user?.role === 'client';
  

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};

    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    console.log("parara: ", params)

    if (isClient) {
        dispatch(fetchWishlistProperties());
      }

    triggerSearch(params);
  }, [location.search, triggerSearch, dispatch, isClient, user?._id]);
  
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

    if (authLoading || isLoading) {
      return (
        <Container sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      );
    }

    if(error){
        return(
            <Alert severity="error" sx={{ mb: 3 }}>
                Failed return search results... 
            </Alert>
        )
    }


  return (
    <Container sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Listings
      </Typography>


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
      <Grid container spacing={6}>
        {data?.length > 0 && data.map((property) => {
          const isWishlisted = wishlist.includes(property._id);
          const isWishlistLoading = loadingIds.includes(property._id);

          return(
            <Grid 
              size={{xs:12, sm:6, md:4}} 
              key={property._id}
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

      {!data && data?.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
            No Properties Found.
        </Alert>
      )}

    </Container>
  );
};

export default SearchResults;
