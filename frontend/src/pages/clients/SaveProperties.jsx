import { Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropertyCard from "../../components/PropertyCard"; 

const SavedProperties = () => {
  const savedProperties = []; // Fetch from API

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Saved Properties
      </Typography>

      <Grid container spacing={3}>
        {savedProperties.length > 0 ? (
          savedProperties.map((property) => (
            <Grid size={{xs:12, sm:6, md:4}} key={property.id}>
              <PropertyCard property={property} />
            </Grid>
          ))
        ) : (
          <Typography>No saved properties yet.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default SavedProperties;
