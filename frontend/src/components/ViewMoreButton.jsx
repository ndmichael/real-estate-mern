import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ViewMoreButton = () => {
  return (
    <Button
      variant="contained"
      endIcon={<ArrowForwardIcon />}
      sx={{
        background: "linear-gradient(45deg, #00C853, #B2FF59)", // Green gradient
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        px: 3, // Padding X
        py: 1.5, // Padding Y
        borderRadius: "30px", // Rounded button
        transition: "0.3s",
        "&:hover": {
          background: "linear-gradient(45deg, #B2FF59, #00C853)", // Reverse gradient on hover
        },
      }}
    >
      View More
    </Button>
  );
};

export default ViewMoreButton;
