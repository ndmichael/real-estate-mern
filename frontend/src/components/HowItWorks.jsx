// import React from 'react';
// import { Container, Typography, Card, CardContent, Box } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { motion } from 'framer-motion';
// import SearchIcon from '@mui/icons-material/Search';
// import HomeWorkIcon from '@mui/icons-material/HomeWork';
// import PaymentsIcon from '@mui/icons-material/Payments';

// const steps = [
//   {
//     id: 1,
//     icon: <SearchIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, 
//     title: 'Find Your Property',
//     desc: 'Search and explore the best properties based on your preference.',
//   },
//   {
//     id: 2,
//     icon: <HomeWorkIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, 
//     title: 'Schedule a Visit',
//     desc: 'Visit the property and verify all details with ease.',
//   },
//   {
//     id: 3,
//     icon: <PaymentsIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, 
//     title: 'Secure the Deal',
//     desc: 'Complete the transaction and move into your dream home.',
//   },
// ];

// const HowItWorks = () => {
//   return (
//     <Container sx={{ my: 8, textAlign: 'center' }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         How It Works
//       </Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
//         Follow these simple steps to get your perfect home.
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {steps.map((step) => (
//           <Grid item xs={12} sm={6} md={4} key={step.id}>
//             <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
//               <Card
//                 elevation={3}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   textAlign: 'center',
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   transition: 'transform 0.3s ease-in-out',
//                   '&:hover': { transform: 'translateY(-10px)' },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     borderRadius: '50%',
//                     backgroundColor: '#E8F5E9',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'relative',
//                     mb: 3,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: -10,
//                       right: -10,
//                       width: 30,
//                       height: 30,
//                       borderRadius: '50%',
//                       backgroundColor: '#4CAF50',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: '#fff',
//                       fontSize: '14px',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     {step.id}
//                   </Box>
//                   {step.icon}
//                 </Box>
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {step.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {step.desc}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default HowItWorks;

import { Container, Typography, Box, Card, CardContent, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { motion } from "framer-motion";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

const steps = [
  {
    id: 1,
    icon: <SearchOutlinedIcon sx={{ fontSize: 40, color: "#4CAF50" }} />, 
    title: "Find Your Perfect Home",
    desc: "Browse thousands of listings with detailed information, high-quality images, and pricing to match your budget."
  },
  {
    id: 2,
    icon: <HomeWorkOutlinedIcon sx={{ fontSize: 40, color: "#4CAF50" }} />, 
    title: "Schedule a Visit",
    desc: "Connect with property agents to arrange in-person or virtual tours at your convenience."
  },
  {
    id: 3,
    icon: <PaymentsOutlinedIcon sx={{ fontSize: 40, color: "#4CAF50" }} />, 
    title: "Secure the Best Deal",
    desc: "Negotiate the best terms and complete the rental process with ease, hassle-free and secure."
  }
];

const HowItWorks = () => {
  return (
    <Container sx={{ textAlign: "center", py: 10 }}>
      {/* Header Section */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        How It Works
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "600px", margin: "0 auto" }}>
        Discover a simple and seamless way to find your next home. Follow these steps to get started.
      </Typography>

      {/* Call to Action */}
      <Button 
        variant="contained"
        sx={{
          background: "#4CAF50",
          color: "white",
          px: 4,
          py: 1.5,
          borderRadius: "25px",
          fontSize: "14px",
          fontWeight: "bold",
          mt: 2,
          "&:hover": { background: "#388E3C" }
        }}
      >
        Contact an Agent
      </Button>

      {/* Steps Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
        {steps.map((step) => (
          <Grid size={{xs:12, sm:4}} key={step.id}>
            <Box sx={{ position: "relative", textAlign: "center" }}>
              {/* Numbering */}
              <Typography
                component="div"
                sx={{
                  fontSize: "100px",
                  fontWeight: "bold",
                  color: "rgba(76, 175, 80, 0.1)",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1
                }}
              >
                {step.id}
              </Typography>
              
              {/* Card Section */}
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card elevation={0} sx={{ position: "relative", zIndex: 2, background: "transparent" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      {step.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">{step.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{step.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;

