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
      <Box py={7} sx={{maxWidth: 850, width: "100%"}}>
          {/* Hero Text */}
        <Typography 
          fontWeight="bold" 
          color="black" gutterBottom
          variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "0 3px 6px rgba(0,0,0,0.4)",
            }}
        >
          Your Next Home Awaits
        </Typography>
        <Typography 
          color="textSecondary" 
          variant="h6"
            sx={{
              mb: 4,
              color: "rgba(08, 08, 08, 0.9)",
            }}
        >
          Browse thousands of verified properties for sale, rent, or short let — all in one place, 
          tailored just for you.
        </Typography>

        {/* Search Features */}
        <SearchBar showTabs={true} />
      </Box>
    </Box>
  );
};

export default HeroSection;

