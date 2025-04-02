import { Link } from "react-router-dom";
import {Typography, Container, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import PropertyCard from "./PropertyCard";

// Images
import house1 from '../assets/images/img1.webp'
import house2 from '../assets/images/img2.webp'
import house3 from '../assets/images/img3.webp'
import ViewMoreButton from "./ViewMoreButton";


const FeaturedListings = () => {
  // Sample featured properties
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
  ];

  
  return (
    <Container sx={{ my: 5,  width: "100%" }}>
      {/* Header with Title and "See All" Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Typography variant="h5" fontWeight="bold">
          New Listings
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
          View All <ArrowRightAltIcon />
        </Button>
      </Box>

      <Grid container spacing={4}>
        {featuredProperties.map((property) => (
          <Grid size={{xs:12, sm:6, md:6}}  key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid> 
    </Container>
  );
};

export default FeaturedListings;
