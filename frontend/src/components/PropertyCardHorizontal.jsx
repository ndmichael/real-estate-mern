import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Button, Tooltip, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import WcIcon from "@mui/icons-material/Wc";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PropertyCardHorizontal = ({ 
  property, showActions, 
  onEdit, onDelete, 
  onToggleWishlist, isWishlisted, 
  isWishlistLoading 
}) => {
  const { loadingIds } = useSelector((state) => state.auth);
  const isLoading = loadingIds.includes(property._id); // Only check this property

  // Define category styles
  const categoryStyles = {
    buy: { backgroundColor: "green", color: "white" },
    rent: { backgroundColor: "blue", color: "white" },
    shortlet: { backgroundColor: "orange", color: "white" }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxShadow: 3,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        overflow: "hidden",
        "&:hover .view-more": {
          opacity: 1,
        },
      }}
    >
      {/* Property Image with Like Button Overlay */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          className="property-image"
          sx={{ 
            height: 220, 
            objectFit: "cover", 
            width: "100%", 
            transition: "transform 0.3s ease-in-out" 
          }}
          image={property.images[0] || "/images/default1-property.jpg"}
          alt={property.title}
          onError={(e) => {
            e.target.onerror = null; // avoid infinite loop
            e.target.src = "/images/default1-property.jpg";
          }}
        />
        
        {/* Wishlist Icon */}
        <Tooltip title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(property._id);
            }}
            disabled={isWishlistLoading}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="success" />
            ) : isWishlisted ? (
              <FavoriteIcon color="success" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Property Content */}
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Category Badge */}
        <Box sx={{ position: "absolute", top: 10, left: 10, backgroundColor: categoryStyles[property.category]?.backgroundColor, color: categoryStyles[property.category]?.color, padding: "5px 10px", borderRadius: "5px", fontWeight: "bold" }}>
          {property.category.charAt(0).toUpperCase() + property.category.slice(1)}
        </Box>

        {/* Title & Location */}
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {property.title} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.location.city}
          </Typography>
        </Box>

        {/* Price & View More */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="h6" color="green" sx={{ fontSize: ".85rem", fontWeight: "bold" }}>
            NGN {property.price.toLocaleString()}
          </Typography>
          <Button
            component={Link}
            to={`/property/${property._id}`}
            variant="text"
            size="small"
            endIcon={<ArrowForwardIcon />}
            className="view-more"
            sx={{ opacity: 0, transition: "opacity 0.3s", fontSize: ".75rem" }}
          >
            View More
          </Button>
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
