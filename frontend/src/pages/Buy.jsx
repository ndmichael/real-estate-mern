import { Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import properties from "../data/properties";
import PropertyCard from "../components/PropertyCard";

const Buy = () => {
  const buyProperties = properties.filter((p) => p.category === "buy");

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Properties for Sale
      </Typography>
      <Grid container spacing={3}>
        {buyProperties.map((property) => (
          <Grid size={{xs:12, sm:6}} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Buy;
