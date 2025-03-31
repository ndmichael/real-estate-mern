import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { useDispatch } from 'react-redux';
import { addProperty } from '../../redux/propertySlice.js';
import { 
  Box, TextField, Button, Typography, MenuItem, InputAdornment,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const AddProperty = () => {
  const { control, register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [category, setCategory] = useState('');


  const onSubmit = (data) => {
    const propertyData = {
      ...data,
      images: selectedImages,
    };

    dispatch(addProperty(propertyData));

    alert('Property added successfully!');
    reset();
    setSelectedImages([]);
    setCategory('');
  };

  // Handle category selection
  const handleCategoryChange = (_, newCategory) => {
    if (newCategory) setCategory(newCategory);
  };

  // Handle image selection (max 4 images)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 4) {
      alert("You can upload up to 4 images.");
      return;
    }
    setSelectedImages([...selectedImages, ...files]);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Add Property
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <TextField
          label="Title"
          fullWidth
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 2 }}
        />

        {/* Description */}
        <TextField
          label="Description"
          multiline
          rows={3}
          fullWidth
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{ mb: 2 }}
        />

        {/* Category (Toggle Buttons) */}
        <Typography variant="h6" sx={{ mb: 1 }}>Category</Typography>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <ToggleButtonGroup
              value={category}
              exclusive
              onChange={(event, newCategory) => {
                handleCategoryChange(event, newCategory);
                field.onChange(newCategory);
              }}
              fullWidth
              sx={{ mb: 2 }}
            >
              <ToggleButton 
                value="buy"
                sx={{ "&.Mui-selected": { bgcolor: "green", color: "white" } }}
              >
                Buy
              </ToggleButton>
              <ToggleButton 
                value="rent"
                sx={{ "&.Mui-selected": { bgcolor: "green", color: "white" } }}
              >
                Rent
              </ToggleButton>
              <ToggleButton 
                value="shortlet"
                sx={{ "&.Mui-selected": { bgcolor: "green", color: "white" } }}
              >
                Short Let
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        />
        {errors.category && <Typography color="error">{errors.category.message}</Typography>}

        {/* Price */}
        <TextField
          label="Price"
          type="number"
          fullWidth
          {...register("price", { required: "Price is required", min: 1 })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">₦</InputAdornment>,
          }}
        />

        {/* Location Fields */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Location</Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="City"
              fullWidth
              {...register("location.city", { required: "City is required" })}
              error={!!errors.location?.city}
              helperText={errors.location?.city?.message}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              select
              label="State"
              fullWidth
              {...register("location.state", { required: "State is required" })}
              error={!!errors.location?.state}
              helperText={errors.location?.state?.message}
            >
              <MenuItem value="lagos">Lagos</MenuItem>
              <MenuItem value="fct">FCT</MenuItem>
              <MenuItem value="portharcourt">Port Harcourt</MenuItem>
              <MenuItem value="kano">Kano</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              label="Address"
              fullWidth
              {...register("location.address", { required: "Address is required" })}
              error={!!errors.location?.address}
              helperText={errors.location?.address?.message}
            />
          </Grid>
        </Grid>

        {/* Bedrooms, Bathrooms, Toilets */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Bedrooms"
              type="number"
              fullWidth
              {...register("bedrooms", { required: "Number of bedrooms is required", min: 1 })}
              error={!!errors.bedrooms}
              helperText={errors.bedrooms?.message}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Bathrooms"
              type="number"
              fullWidth
              {...register("bathrooms", { required: "Number of bathrooms is required", min: 1 })}
              error={!!errors.bathrooms}
              helperText={errors.bathrooms?.message}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Toilets"
              type="number"
              fullWidth
              {...register("toilets", { required: "Number of toilets is required", min: 1 })}
              error={!!errors.toilets}
              helperText={errors.toilets?.message}
            />
          </Grid>
        </Grid>

        {/* Image Upload (Max 4) */}
        <Typography variant="h6" sx={{ mt: 2 }}>Upload Images (Max: 4)</Typography>
        <Controller
          name="images"
          control={control}
          rules={{ required: "At least one image is required" }}
          render={({ field }) => (
            <MuiFileInput
              {...field}
              multiple
              value={field.value || []}
              onChange={(files) => setValue("images", files)}
              accept="image/*"
              sx={{ mb: 2 }}
            />
          )}
        />
        {errors.images && <Typography color="error" >{errors.images.message}</Typography>}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3 }}>
          Add Property
        </Button>
      </form>
    </Box>
  );
};

export default AddProperty;
