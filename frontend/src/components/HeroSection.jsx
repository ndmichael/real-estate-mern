import { Box, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar"; // adjust path as needed

const HeroSection = () => {
  return (
    <Box
      id="heroSection"
      sx={{
        color: "white",
        p: 4,
        textAlign: "center",
      }}
    >
      {/* Hero Text */}
      <Typography variant="h3" fontWeight="bold" color="black" gutterBottom>
        Find Your Dream Home
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        Buy, Rent, or Short Let properties easily with us.
      </Typography>

      {/* Search Features */}
      <SearchBar showTabs={true} />
    </Box>
  );
};

export default HeroSection;

