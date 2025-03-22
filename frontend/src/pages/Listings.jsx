import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import properties from "../data/properties"; // Importing demo data
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar"; // Add filtering later

const Listings = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  return (
    <Container sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Listings
      </Typography>

      {/* Filter Component (To Be Implemented) */}
      <FilterBar setFilteredProperties={setFilteredProperties} />

      {/* Grid of Listings */}
      <Grid container spacing={6}>
        {filteredProperties.map((property) => (
          <Grid size={{xs:12, sm:6, md:6}} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Listings;
