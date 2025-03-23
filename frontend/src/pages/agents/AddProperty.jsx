import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddProperty = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Property added successfully!");
        reset();
      } else {
        console.error("Error adding property");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Add Property
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          fullWidth
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          {...register("price", { required: "Price is required", min: 1 })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          fullWidth
          {...register("location", { required: "Location is required" })}
          error={!!errors.location}
          helperText={errors.location?.message}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Property
        </Button>
      </form>
    </Box>
  );
};

export default AddProperty;
