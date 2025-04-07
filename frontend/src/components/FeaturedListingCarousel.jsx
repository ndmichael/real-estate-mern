import React, { useState, useEffect } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  CircularProgress,
  IconButton,
  Tooltip
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropertyCardHorizontal from "./PropertyCardHorizontal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  removeFromWishlist, 
  addToWishlist,
  fetchWishlistProperties 
} from "../redux/authSlice";
import { fetchProperties } from "../redux/propertySlice";

const FeaturedListingCarousel = () => {
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
  const [swiperInstance, setSwiperInstance] = useState(null);

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
    <Container sx={{ py: 5, margin: "auto" }}>
      {/* Header with Title and "See All" Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Featured Listings
        </Typography>
        <Button
          component={Link}
          to="/listings"
          color="success"
          sx={{ 
            textTransform: "none", 
            fontWeight: "bold",
            display: "flex", 
            alignItems: "center",
            gap: 1,
          }}
        >
          See All <ArrowRightAltIcon />
        </Button>
      </Box>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={setSwiperInstance}
        breakpoints={{
          1200: { slidesPerView: 4 },
          992: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
        style={{ paddingBottom: "30px" }}
      >
        {properties.map((property) => {
          const isWishlisted = wishlist.includes(property._id);
          const isWishlistLoading = loadingIds.includes(property._id);
          
          return (
            <SwiperSlide key={property._id}>
              <Box sx={{ 
                width: "100%", 
                display: "flex", 
                justifyContent: "center",
                position: 'relative'
              }}>
                <PropertyCardHorizontal 
                  property={property} 
                  onToggleWishlist={handleWishlistClick} 
                  isWishlistLoading={isWishlistLoading}
                  isWishlisted={isWishlisted}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button 
          onClick={() => swiperInstance?.slidePrev()} 
          sx={{ color: "primary.main" }}
        >
          ← BACK
        </Button>
        <Button 
          onClick={() => swiperInstance?.slideNext()} 
          sx={{ color: "primary.main" }}
        >
          NEXT →
        </Button>
      </Box>
    </Container>
  );
};

export default FeaturedListingCarousel;