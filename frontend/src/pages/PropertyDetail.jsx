import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Button, Card, CardMedia } from "@mui/material";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WcIcon from "@mui/icons-material/Wc";

// Demo Data (Replace this with API fetch later)
const properties = [
  {
    id: "1",
    title: "Luxury 4 Bedroom Duplex",
    location: "Lekki, Lagos",
    price: "150,000,000",
    description: "A beautiful luxury home with modern features.",
    bedrooms: 4,
    bathrooms: 3,
    toilets: 4,
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
    ],
    agent: {
      name: "John Doe",
      phone: "+234 810 123 4567",
      email: "john@example.com",
    },
  },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <Typography variant="h6">Property Not Found</Typography>;

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }} my={8}>
      {/* Title & Location */}
      <Typography variant="h4" fontWeight="bold">
        {property.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={2}>
        {property.location}
      </Typography>

      {/* Property Images */}
      <Grid container spacing={2}>
        {property.images.map((img, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardMedia component="img" image={img} alt={`Property image ${index}`} />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Property Details */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BedIcon color="primary" />
          <Typography>{property.bedrooms} Beds</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BathtubIcon color="primary" />
          <Typography>{property.bathrooms} Baths</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WcIcon color="primary" />
          <Typography>{property.toilets} Toilets</Typography>
        </Box>
      </Box>

      {/* Description */}
      <Typography variant="body1" mt={3} lineHeight={1.6}>
        {property.description}
      </Typography>

      {/* Agent Details & CTA */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #ddd",
          pt: 3,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Contact Agent: {property.agent.name}
          </Typography>
          <Typography variant="body2">Phone: {property.agent.phone}</Typography>
          <Typography variant="body2">Email: {property.agent.email}</Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5 }}>
          Contact Agent
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyDetail;
