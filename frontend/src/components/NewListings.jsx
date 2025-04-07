import { useEffect } from "react";
import {
  Typography, 
  Container, 
  Box, 
  Button ,
  CircularProgress
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import PropertyCard from "./PropertyCard";

import { fetchProperties } from "../redux/propertySlice";
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const NewListings = () => {
  const dispatch = useDispatch();
  const { properties = [], loading } = useSelector((state) => state.property || {});

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]); 


  if (loading) {
    return (
      <Container sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  
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
        {properties?.slice(0, 4).map((property) => (
          <Grid size={{xs:12, sm:6, md:6}}  key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid> 
    </Container>
  );
};

export default  NewListings;
