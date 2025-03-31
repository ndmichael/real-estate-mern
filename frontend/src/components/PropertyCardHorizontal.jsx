import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WcIcon from "@mui/icons-material/Wc";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PropertyCardHorizontal = ({ property, showActions, onEdit, onDelete }) => {
  return (
    <Card
      component={Link}
      to={`/property/${property.id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 320,
        boxShadow: 3,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        overflow: "hidden",
        "&:hover .property-image": {
          transform: "scale(1.1)", // Zoom effect
        },
      }}
    >
      {/* Property Image with Like Button Overlay */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          className="property-image"
          sx={{ height: 180, transition: "transform 0.3s ease-in-out" }}
          image={property.images[0]}
          alt={property.title}
        />
        
        {/* Like Button (Top Right) */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Property Content */}
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Title & Location */}
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {property.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.location.city}
          </Typography>
          <Typography variant="h6" color="green" sx={{ mt: 1 }}>
            NGN {property.price.toLocaleString()}
          </Typography>
        </Box>

        {/* Icons for Bedrooms, Bathrooms, Toilets */}
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

        {/* Show Edit & Delete Buttons in Dashboard */}
        {showActions && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" startIcon={<EditIcon />} onClick={(e) => { e.preventDefault(); onEdit(); }}>
              Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={(e) => { e.preventDefault(); onDelete(); }}>
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCardHorizontal;
