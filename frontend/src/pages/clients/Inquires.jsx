import { Box, Typography, Paper } from "@mui/material";

const Inquiries = () => {
  const inquiries = []; // Fetch from API

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Inquiries & Messages
      </Typography>

      {inquiries.length > 0 ? (
        inquiries.map((msg) => (
          <Paper key={msg.id} sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight="bold">{msg.agentName}</Typography>
            <Typography>{msg.message}</Typography>
          </Paper>
        ))
      ) : (
        <Typography>No messages yet.</Typography>
      )}
    </Box>
  );
};

export default Inquiries;
