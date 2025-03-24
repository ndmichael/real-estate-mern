import { Box, Typography, TextField, Button } from "@mui/material";

const ProfileSettings = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Account Settings
      </Typography>

      <TextField fullWidth label="Full Name" variant="outlined" sx={{ mb: 2 }} />
      <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 2 }} />
      <TextField fullWidth label="Phone Number" variant="outlined" sx={{ mb: 2 }} />

      <Button variant="contained" color="success">
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileSettings;
