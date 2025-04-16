import { useEffect } from "react";
import { Box, Typography,  Button, CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Chat, Star, FormatListBulletedOutlined, Visibility } from "@mui/icons-material";
import DashboardCard from "../../components/dashboard/DashboardCard";

import { useDispatch, useSelector } from "react-redux";
import { fetchAgentStats } from "../../redux/agentSlice";

const AgentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, loading } = useSelector((state) => state.agent);

  console.log("stats: ", stats)

  useEffect(() => {
    dispatch(fetchAgentStats(user.user._id));
  }, [dispatch, user]);


  if (loading || !stats) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Agent Dashboard
        </Typography>
        
        {/* Overview Cards */}
        <Grid container spacing={4}>
          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard 
                title="Total Listings"
                count={stats.totalProperties} // Dynamic
                icon={<FormatListBulletedOutlined />}
                link="/agent/dashboard"
                backgroundColor="#f5f5f5"
            />
          </Grid>
          
          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard 
                title="Featured Listings"
                count={stats.totalProperties} // Dynamic
                icon={<Star />}
                link="/agent/dashboard"
                backgroundColor= "#e0f7fa"
            />
          </Grid>

          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard
                title="Leads & Messages"
                count={stats.totalInquiries} // Dynamic
                icon={<Chat />}
                link="/agent/dashboard"
                backgroundColor= "#fbe9e7"
            />
          </Grid>

          <Grid size={{xs:12, sm:6, md:3}}>
            <DashboardCard 
                title="Total Views"
                count={800} // Dynamic
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
