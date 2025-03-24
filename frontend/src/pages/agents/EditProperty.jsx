import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

const EditProperty = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/listings/${id}`);
        const data = await response.json();

        // Set form values
        setValue("title", data.title);
        setValue("price", data.price);
        setValue("location", data.location);

        // setLoading(false);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Property updated successfully!");
      } else {
        console.error("Error updating property");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

//   if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Property
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
          Update Property
        </Button>
      </form>
    </Box>
  );
};

export default EditProperty;
