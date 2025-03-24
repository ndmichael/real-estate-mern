import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Favorite, Message, Home } from "@mui/icons-material";
import PropertyCard from "../../components/PropertyCard";

const ClientDashboard = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Welcome Back, Client!
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{xs:12, sm:4}}>
          <PropertyCard
            title="Saved Properties"
            count={8} // Dynamic
            icon={<Favorite fontSize="large" color="error" />}
            link="/client/saved-properties"
          />
        </Grid>

        <Grid size={{xs:12, sm:4}}>
          <PropertyCard
            title="Inquiries"
            count={5} // Dynamic
            icon={<Message fontSize="large" color="primary" />}
            link="/client/inquiries"
          />
        </Grid>

        <Grid size={{xs:12, sm:4}}>
          <PropertyCard
            title="Bookings"
            count={2} // Dynamic
            icon={<Home fontSize="large" color="success" />}
            link="/client/bookings"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;
