import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/admin/dashboardSlice";
import {
  Card,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import PeopleIcon from "@mui/icons-material/People";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const iconMap = {
  users: <PeopleIcon fontSize="large" />,
  agents: <VerifiedUserIcon fontSize="large" />,
  properties: <HomeWorkIcon fontSize="large" />,
  inquiries: <ContactSupportIcon fontSize="large" />,
};

const AdminDashboardOverview = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.adminDashboardStat);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (isLoading)
    return (
      <Box sx={{ py: 5, display: "flex", justifyContent: "center" }}>
        <CircularProgress color="success" />
        <Typography pl={3} gutterBottom>
          Fetching data, please wait.....
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3} p={3}>
      {["users", "agents", "properties", "inquiries"].map((key) => (
        <Grid size={{xs:12, sm:6, md:4}}>
          <Card
            sx={{
              p: 2,
              borderRadius: 4,
              boxShadow: 3,
              transition: "all 0.3s ease",
              background: "linear-gradient(135deg, #e0f2f1, #ffffff)",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "green",
                  width: 48,
                  height: 48,
                  boxShadow: 2,
                }}
              >
                {iconMap[key]}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {key.toUpperCase()}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {stats[key] || 0}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminDashboardOverview;
