import React from 'react';
import { 
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

const AgentCard = ({ agent }) => {
  const {
    profileImage,
    firstName,
    lastName,
    email,
    phone,
    agentDetails,
    createdAt,
    savedListings = [],
    _id,
  } = agent;


  const InfoItem = ({ icon, text, color }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      {icon}
      <Typography variant="body2" color={color || 'text.secondary'}>
        {text}
      </Typography>
    </Stack>
  );

  return (
    <Paper 
      elevation={3} 
      sx={{
        borderRadius: 2,
        p: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 3
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <Avatar
          src={profileImage || '/default-user.jpg'}
          alt={`${firstName} ${lastName}`}
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Typography variant="h6" fontWeight="medium">
            {agentDetails?.companyName || `${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agent since {new Date(createdAt).getFullYear()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {phone}
          </Typography>
        </Box>
      </Stack>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={3}
        alignItems="center"
      >
        <InfoItem 
          icon={<HomeIcon fontSize="small" />} 
          text={`${savedListings.length} Listings`} 
        />
        <InfoItem 
          icon={<PeopleIcon fontSize="small" />} 
          text="Team of 5+" 
        />
        <InfoItem 
          icon={<VerifiedIcon fontSize="small" color="success" />} 
          text="Verified Agent" 
          color="success.main"
        />
        <Button 
          variant="contained" 
          color="error"
          sx={{
            px: 3,
            py: 1,
            borderRadius: '10px'
          }}
        >
          Contact Agent
        </Button>
      </Stack>
    </Paper>
  );
};

export default AgentCard;