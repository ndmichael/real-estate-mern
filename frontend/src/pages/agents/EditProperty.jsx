import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProperty, fetchPropertyById } from "../../redux/propertySlice";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Typography, Container, Grid, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2"

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { property, loading } = useSelector((state) => state.property);
  const [imagePreview, setImagePreview] = useState([]);
  const [updating, setUpdating] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchPropertyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (property) {
      Object.keys(property).forEach((key) => setValue(key, property[key]));
      setImagePreview(property.images || []);
    }
  }, [property, setValue]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (data) => {
    setUpdating(true);
    await dispatch(updateProperty({ id, propertyData: data}));
    setUpdating(false);
    navigate("/agent/mylistings");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Edit Property
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => <TextField {...field} label="Title" fullWidth error={!!errors.title} helperText={errors.title?.message} />}
            />
          </Grid>
          <Grid size={{xs:12}}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Description" multiline rows={4} fullWidth />}
            />
          </Grid>
          <Grid size={{xs:12, sm: 6}}>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Price" type="number" fullWidth />}
            />
          </Grid>
          <Grid size={{xs:12, sm: 6}}>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} select label="Category" fullWidth>
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="rent">Rent</MenuItem>
                  <MenuItem value="shortlet">Shortlet</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{xs:12}}>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {imagePreview.map((src, index) => (
                <img key={index} src={src} alt="Preview" width={100} height={100} style={{ objectFit: "cover" }} />
              ))}
            </div>
          </Grid>
          <Grid size={{xs:12}}>
            <Button type="submit" variant="contained" color="success" fullWidth disabled={updating}>
              {updating ? <CircularProgress size={24} /> : "Update Property"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProperty;
