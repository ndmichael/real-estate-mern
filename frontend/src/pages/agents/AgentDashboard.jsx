import { useState } from "react";
import { Box, Typography,  Button, Card, CardContent } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Chat, Star, FormatListBulletedOutlined, Visibility } from "@mui/icons-material";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";

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
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard 
                title="Total Listings"
                count={listings.total} // Dynamic
                icon={<FormatListBulletedOutlined />}
                link="/agent/dashboard"
                backgroundColor="#f5f5f5"
            />
          </Grid>
          
          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard 
                title="Featured Listings"
                count={listings.featured} // Dynamic
                icon={<Star />}
                link="/agent/dashboard"
                backgroundColor= "#e0f7fa"
            />
          </Grid>

          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard
                title="Leads & Messages"
                count={leads} // Dynamic
                icon={<Chat />}
                link="/agent/dashboard"
                backgroundColor= "#fbe9e7"
            />
          </Grid>

          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard 
                title="Total Views"
                count={views} // Dynamic
                icon={<Visibility />}
                link="/agent/dashboard"
                backgroundColor="#fff3e0"
            />
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
