import {Typography, Container, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';

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
      image: house1,
    },
    {
      id: 2,
      title: "Modern 2 Bedroom Condo",
      location: "Abuja, Nigeria",
      price: "180,000",
      bedrooms: 2,
      bathrooms: 2,
      toilets: 2,
      image: house2,
    },
    {
      id: 3,
      title: "Spacious 4 Bedroom Duplex",
      location: "Kano, Nigeria",
      price: "320,000",
      bedrooms: 4,
      bathrooms: 3,
      toilets: 4,
      image: house3,
    },
    {
      id: 4,
      title: "Elegant 5 Bedroom Villa",
      location: "Port Harcourt, Nigeria",
      price: "500,000",
      bedrooms: 5,
      bathrooms: 4,
      toilets: 5,
      image: house1,
    },
  ];

  return (
    <Container sx={{ my: 5,  width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{mb: 4}}>
        Featured Listings
      </Typography>
      <Grid container spacing={4}>
        {featuredProperties.map((property) => (
          <Grid size={{xs:12, sm:6, md:6}}  key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>

      <Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <ViewMoreButton/>
        </Box>
      </Grid>

      
    </Container>
  );
};

export default FeaturedListings;
