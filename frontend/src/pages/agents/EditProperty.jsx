import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProperty, fetchPropertyById } from "../../redux/propertySlice";
import { useParams, useNavigate } from "react-router-dom";
import { 
  TextField, Button, MenuItem, Typography, Container, 
  CircularProgress, Box, Switch, FormControlLabel, Chip
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const MAX_IMAGES = 4;

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { property, loading } = useSelector((state) => state.property);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [updating, setUpdating] = useState(false);

  const states = [
    "Kano", "Abuja", "Portharcourt", "Lagos", "Aba"
  ]

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchPropertyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (property) {
      // Set all form values from the property object
      Object.keys(property).forEach((key) => {
        if (key === 'location') {
          setValue('location.city', property.location.city);
          setValue('location.state', property.location.state);
          setValue('location.address', property.location.address);
        } else {
          setValue(key, property[key]);
        }
      });
      
      // Handle images
      if (property.images && property.images.length) {
        setImagePreviews(property.images.map(img => ({
          url: img,
          isNew: false
        })));
      }
    }
  }, [property, setValue]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_IMAGES - imagePreviews.length);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true
    }));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const imageToRemove = imagePreviews[index];
    if (!imageToRemove.isNew) {
      setFilesToDelete([...filesToDelete, imageToRemove.url]);
    }
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const onSubmit = async (data) => {
    setUpdating(true);
    
    const formData = new FormData();
    
    // Append all property data
    Object.keys(data).forEach(key => {
      if (key === 'location') {
        formData.append('location', JSON.stringify(data.location));
      } else if (key !== 'images') {
        formData.append(key, data[key]);
      }
    });
    
    // Append new images
    imagePreviews.forEach((img) => {
      if (img.isNew) {
        formData.append('images', img.file);
      }
    });
    
    // Append files to delete
    if (filesToDelete.length) {
      formData.append('filesToDelete', JSON.stringify(filesToDelete));
    }
    
    await dispatch(updateProperty({ 
      id, 
      propertyData: formData 
    }));
    
    setUpdating(false);
    navigate("/agent/mylistings");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Edit Property
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid size={{xs:12}}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
          </Grid>
          
          <Grid size={{xs:12}}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Property Title" 
                  fullWidth 
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs:12}}>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Category"
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  <MenuItem value="rent">For Rent</MenuItem>
                  <MenuItem value="buy">For Sale</MenuItem>
                  <MenuItem value="shortlet">Shortlet</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <Controller
              name="price"
              control={control}
              rules={{ 
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  InputProps={{ startAdornment: '₦' }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </Grid>
          
          {/* Location Details */}
          <Grid size={{xs:12}}>
            <Typography variant="h6" gutterBottom>
              Location Details
            </Typography>
          </Grid>
          
          <Grid size={{xs:12}}>
            <Controller
              name="location.address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Address"
                  fullWidth
                  error={!!errors.location?.address}
                  helperText={errors.location?.address?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <Controller
              name="location.city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.location?.city}
                  helperText={errors.location?.city?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <Controller
              name="location.state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="State"
                  fullWidth
                  error={!!errors.location?.state}
                  helperText={errors.location?.state?.message}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          
          {/* Property Details */}
          <Grid size={{xs:12}}>
            <Typography variant="h6" gutterBottom>
              Property Details
            </Typography>
          </Grid>
          
          <Grid size={{xs:12, md:4}}>
            <Controller
              name="bedrooms"
              control={control}
              rules={{ 
                required: "Bedrooms count is required",
                min: { value: 0, message: "Must be 0 or more" }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bedrooms"
                  type="number"
                  fullWidth
                  error={!!errors.bedrooms}
                  helperText={errors.bedrooms?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs:12, md:4}}>
            <Controller
              name="bathrooms"
              control={control}
              rules={{ 
                required: "Bathrooms count is required",
                min: { value: 0, message: "Must be 0 or more" }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bathrooms"
                  type="number"
                  fullWidth
                  error={!!errors.bathrooms}
                  helperText={errors.bathrooms?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs:12, md:4}}>
            <Controller
              name="toilets"
              control={control}
              rules={{ 
                required: "Toilets count is required",
                min: { value: 0, message: "Must be 0 or more" }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Toilets"
                  type="number"
                  fullWidth
                  error={!!errors.toilets}
                  helperText={errors.toilets?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs:12}}>
            <Controller
              name="isAvailable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                      color="primary"
                    />
                  }
                  label="Property is available"
                />
              )}
            />
          </Grid>
          
          {/* Images */}
          <Grid size={{xs:12}}>
            <Typography variant="h6" gutterBottom>
              Property Images (Max {MAX_IMAGES})
            </Typography>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="property-images-upload"
              disabled={imagePreviews.length >= MAX_IMAGES}
            />
            <label htmlFor="property-images-upload">
              <Button 
                variant="contained" 
                component="span"
                disabled={imagePreviews.length >= MAX_IMAGES}
              >
                Upload Images ({imagePreviews.length}/{MAX_IMAGES})
              </Button>
            </label>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {imagePreviews.map((img, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img
                    src={img.url || img.preview}
                    alt={`Preview ${index}`}
                    width={150}
                    height={150}
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                  <Chip
                    label="Remove"
                    size="small"
                    onDelete={() => removeImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'error.main',
                      color: 'white'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
          
          {/* Submit Button */}
          <Grid size={{xs:12}} sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={updating}
            >
              {updating ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Update Property'
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProperty;