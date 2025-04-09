// import { useState } from "react";
// import { Box, Typography, Button, Tabs, Tab, FormControl, MenuItem, Select, InputLabel } from "@mui/material";

// const HeroSection = () => {
//   const [searchType, setSearchType] = useState(0); // 0 = Buy, 1 = Rent, 2 = Short Let
//   const [location, setLocation] = useState("");

//   return (
//     <Box
//       id="heroSection"
//       sx={{
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* Title */}
//       <Typography variant="h3" fontWeight="bold" color="black" gutterBottom>
//         Find Your Dream Home
//       </Typography>
//       <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
//         Buy, Rent, or Short Let properties easily with us.
//       </Typography>

//       {/* Buy, Rent, Short Let Tabs */}
//       <Tabs
//         value={searchType}
//         onChange={(e, newValue) => setSearchType(newValue)}
//         textColor="inherit"
//         indicatorColor="primary"
//         sx={{
//           background: "rgba(0, 69, 41, 0.2)",
//           borderRadius: 2,
//           mb: 3,
//           width: { xs: "90%", md: "50%" },
//           "& .MuiTabs-indicator": {
//             backgroundColor: "#2e7d32", // Dark green
//             height: 4, // Thicker underline
//           }
//         }}
//       >
//         <Tab label="Buy" sx={{ flex: 1 }} />
//         <Tab label="Rent" sx={{ flex: 1 }} />
//         <Tab label="Short Let" sx={{ flex: 1 }} />
//       </Tabs>

//       {/* Search Form - WIDER */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: 2,
//           background: "rgba(255, 255, 255, 0.2)",
//           padding: 3,
//           borderRadius: 2,
//           width: { xs: "90%", md: "60%" }, // WIDER FORM
//         }}
//       >
//         {/* Location Dropdown */}
//         <FormControl fullWidth sx={{ background: "white", borderRadius: 1 }}>
//           <InputLabel>Location</InputLabel>
//           <Select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           >
//             <MenuItem value="Lagos">Lagos</MenuItem>
//             <MenuItem value="Kano">Kano</MenuItem>
//             <MenuItem value="Abuja">Abuja</MenuItem>
//             <MenuItem value="Port Harcourt">Port Harcourt</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Search Button */}
//         <Button 
//           variant="contained" 
//           sx={{ 
//             px: 5, py: 2, fontSize: "1rem" ,
//             bgcolor: '#1e824a',  // Sample green from gradient
//             '&:hover': { bgcolor: '#136338' }
//           }}
          
//         >
//           Search
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default HeroSection;


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

