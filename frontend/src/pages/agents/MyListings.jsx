import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProperties, deleteProperty } from "../../redux/propertySlice";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import PropertyCardHorizontal from "../../components/PropertyCardHorizontal";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myProperties=[], loading, error } = useSelector((state) => state.property || {});

    useEffect(() => {
        console.log("Dispatching fetchMyProperties..."); 
        dispatch(fetchMyProperties());
    }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      dispatch(deleteProperty(id));
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        My Properties
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {myProperties.map((property) => (
            <Grid item key={property.id} xs={12} sm={6} md={4}>
              <PropertyCardHorizontal
                property={property}
                showActions
                onEdit={() => navigate(`/agent/property/edit/${property._id}`)}
                onDelete={() => handleDelete(property._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyListings;
