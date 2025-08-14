import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WcIcon from "@mui/icons-material/Wc";

const PropertyCard = ({ property }) => {
  return (
    <Card 
      component={Link}
      to={`/property/${property._id}`}
      sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          width: "100%", mb: 2, boxShadow: 3 ,
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#f0f0f0", // Light gray background on hover
            color: "inherit"
          },
          
        }}
    >
      {/* Property Image */}
      <CardMedia
        component="img"
        sx={{ width: { xs: "100%", sm: 250 }, height: 180 }}
        image={property.images[0]}
        alt={property.title}
      />

      {/* Property Details */}
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {property.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.location.city}, Nigeria
          </Typography>
          <Typography variant="h6" color="success" sx={{ mt: 1 }}>
            NGN{property.price.toLocaleString()}
          </Typography>
        </Box>

        {/* Footer - Bedrooms, Bathrooms, Toilets */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            pt: 2,
            borderTop: "1px solid #ddd",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BedIcon fontSize="small" />
            <Typography variant="body2">{property.bedrooms} Beds</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BathtubIcon fontSize="small" />
            <Typography variant="body2">{property.bathrooms} Baths</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <WcIcon fontSize="small" />
            <Typography variant="body2">{property.toilets} Toilets</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
