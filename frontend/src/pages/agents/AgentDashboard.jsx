import { useState } from "react";
import { Box, Typography, Grid, Button, Card, CardContent } from "@mui/material";
import { TrendingUp, Email, Visibility, Star } from "@mui/icons-material";
import DashboardLayout from "../../layouts/DashboardLayout";

const AgentDashboard = () => {
  const [listings, setListings] = useState({ free: 3, featured: 2, total: 5 });
  const [leads, setLeads] = useState(8);
  const [views, setViews] = useState(1200);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Agent Dashboard
        </Typography>
        
        {/* Overview Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, backgroundColor: "#f5f5f5" }}>
              <CardContent>
                <Typography variant="h6">Total Listings</Typography>
                <Typography variant="h4" color="primary">{listings.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, backgroundColor: "#e0f7fa" }}>
              <CardContent>
                <Typography variant="h6">Featured Listings</Typography>
                <Typography variant="h4" color="secondary">{listings.featured}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, backgroundColor: "#fbe9e7" }}>
              <CardContent>
                <Typography variant="h6">Leads & Messages</Typography>
                <Typography variant="h4" color="success.main">{leads}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, backgroundColor: "#fff3e0" }}>
              <CardContent>
                <Typography variant="h6">Total Views</Typography>
                <Typography variant="h4" color="text.primary">{views}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Upgrade Section */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Want More Visibility?
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Upgrade to Premium to increase your reach and get more leads!
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Upgrade to Premium
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AgentDashboard;
