import { Box, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar"; // adjust path as needed

const HeroSection = () => {
  return (
    <Box
      id="heroSection"
      sx={{
        color: "white",
        p: 2,
        textAlign: "center",
      }}
    >
      <Box  sx={{maxWidth: 850, width: "100%", mx: "auto"}}>
          {/* Hero Text */}
        <Typography 
          fontWeight="bold" 
          color="black" gutterBottom
          variant="h3"
            component="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "0 3px 6px rgba(0,0,0,0.4)",
              fontSize: {
                xs: "1.8rem", // phones
                sm: "2.2rem", // tablets
                md: "2.8rem", // small desktops
                lg: "3.2rem", // large screens
              },
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

