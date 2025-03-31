import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProperties, deleteProperty } from "../../redux/propertySlice";
import { 
  Container, 
  Typography, 
  Grid, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button 
} from "@mui/material";

import PropertyCardHorizontal from "../../components/PropertyCardHorizontal";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myProperties = [], loading } = useSelector((state) => state.property || {});

  const [open, setOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  // Open the modal and store the property ID
  const handleOpen = (id) => {
    setSelectedPropertyId(id);
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedPropertyId(null);
  };

  // Confirm delete action
  const handleDelete = () => {
    if (selectedPropertyId) {
      dispatch(deleteProperty(selectedPropertyId));
    }
    handleClose();
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
            <Grid item key={property._id} xs={12} sm={6} md={4}>
              <PropertyCardHorizontal
                property={property}
                showActions
                onEdit={() => navigate(`/agent/property/edit/${property._id}`)}
                onDelete={() => handleOpen(property._id)} // Open modal
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"  onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyListings;
