import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropertyCardHorizontal from "./PropertyCardHorizontal";
import { Link } from "react-router-dom";

// Images
import house1 from '../assets/images/img1.webp'
import house2 from '../assets/images/img2.webp'
import house3 from '../assets/images/img3.webp'

const FeaturedListingCarousel = () => {
//   const [properties, setProperties] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const featuredProperties = [
      {
        id: 1,
        title: "Luxury 3 Bedroom Apartment",
        location: "Lagos, Nigeria",
        price: "250,000",
        bedrooms: 3,
        bathrooms: 2,
        toilets: 3,
        images: [house1],
      },
      {
        id: 2,
        title: "Modern 2 Bedroom Condo",
        location: "Abuja, Nigeria",
        price: "180,000",
        bedrooms: 2,
        bathrooms: 2,
        toilets: 2,
        images: [house2],
      },
      {
        id: 3,
        title: "Spacious 4 Bedroom Duplex",
        location: "Kano, Nigeria",
        price: "320,000",
        bedrooms: 4,
        bathrooms: 3,
        toilets: 4,
        images: [house3],
      },
      {
        id: 4,
        title: "Elegant 5 Bedroom Villa",
        location: "Port Harcourt, Nigeria",
        price: "500,000",
        bedrooms: 5,
        bathrooms: 4,
        toilets: 5,
        images: [house1],
      },
      {
        id: 3,
        title: "Spacious 4 Bedroom Duplex",
        location: "Kano, Nigeria",
        price: "320,000",
        bedrooms: 4,
        bathrooms: 3,
        toilets: 4,
        images: [house3],
      },
      {
        id: 4,
        title: "Elegant 5 Bedroom Villa",
        location: "Port Harcourt, Nigeria",
        price: "500,000",
        bedrooms: 5,
        bathrooms: 4,
        toilets: 5,
        images: [house1],
      },
    ];

//   useEffect(() => {
//     const featuredProperties = async () => {
//       try {
//         const res = await fetch("/api/properties/featured?limit=8"); // Fetch featured properties
//         const data = await res.json();
//         setProperties(data.properties);
//       } catch (error) {
//         console.error("Error fetching featured listings:", error);
//       }
//     };
//     fetchProperties();
//   }, []);

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
        {featuredProperties.map((property) => (
          <SwiperSlide key={property._id}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <PropertyCardHorizontal property={property} />
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
