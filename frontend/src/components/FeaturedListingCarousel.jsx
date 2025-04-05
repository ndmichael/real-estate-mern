import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropertyCardHorizontal from "./PropertyCardHorizontal";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, addToWishlist } from "../redux/authSlice";
import { fetchProperties } from "../redux/propertySlice";

// // Images
// import house1 from '../assets/images/img1.webp'
// import house2 from '../assets/images/img2.webp'
// import house3 from '../assets/images/img3.webp'

const FeaturedListingCarousel = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); 
  const { properties = [], loading } = useSelector((state) => state.property || {});

  const wishlist = useSelector((state) => state.auth.wishlist) || []; // Get wishlist directly from Redux

  const handleWishlistToggle = (propertyId) => {
    if (wishlist.includes(propertyId)) {
      // If the property is already in the wishlist, remove it
      console.log("remove wishlist triggered")
      dispatch(removeFromWishlist(propertyId));
    } else {
      // If the property is not in the wishlist, add it
      console.log("add wishlist triggered")
      dispatch(addToWishlist(propertyId));
    }
  };

//   const [properties, setProperties] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Fetch properties when the component mounts
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

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
          color="success" // Green color
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
        {properties.map((property) => (
          <SwiperSlide key={property._id}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <PropertyCardHorizontal 
                property={property} 
                isWishlisted={wishlist.includes(property._id)} // Passing wishlist state
                onToggleWishlist={() => handleWishlistToggle(property._id)} // Passing the handler
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Back & Next Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button onClick={() => swiperInstance?.slidePrev()} sx={{ color: "blue" }}>
          ← BACK
        </Button>
        <Button onClick={() => swiperInstance?.slideNext()} sx={{ color: "blue" }}>
          NEXT →
        </Button>
      </Box>
    </Container>
  );
};

export default FeaturedListingCarousel;
