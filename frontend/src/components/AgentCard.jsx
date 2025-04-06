import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Stack,
  Grid,
  Divider,
  Chip,
  Collapse,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Verified as VerifiedIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationCity as OfficeIcon,
  Category as CategoryIcon,
  Language as LanguageIcon,
  Map as MapIcon,
  Business as BusinessIcon,
  Info as InfoIcon,
  Work as WorkIcon
} from '@mui/icons-material';

const AgentCard = ({ agent }) => {
  const theme = useTheme();
  const [showContact, setShowContact] = useState(false);
  
  // Destructure with proper fallbacks for nested objects
  const {
    profileImage,
    firstName,
    lastName,
    email,
    phone,
    agentDetails = {}, // Default empty object if undefined
    activeListings = [],
    isVerified
  } = agent;

  // Get all agent details with proper fallbacks
  const {
    companyName = 'Independent Agent',
    title = 'Real Estate Professional',
    bio = 'No bio provided',
    specialties = [],
    languages = ['English'],
    serviceAreas = [],
    teamSize = 1,
    officeAddress = 'Main Office',
    officeHours = 'Mon-Fri 9am-5pm'
  } = agentDetails;

  const renderInfoItem = (icon, text, subtext, color) => (
    <Stack direction="row" alignItems="flex-start" spacing={1.5}>
      <Box sx={{ color: color || theme.palette.text.secondary, pt: 0.5 }}>
        {React.cloneElement(icon, { fontSize: 'small' })}
      </Box>
      <Box>
        <Typography variant="body2" color={color || 'text.secondary'}>
          {text}
        </Typography>
        {subtext && (
          <Typography variant="caption" color="text.disabled" display="block">
            {subtext}
          </Typography>
        )}
      </Box>
    </Stack>
  );

  const renderFooterChips = (items, icon, label) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {React.cloneElement(icon, { fontSize: 'small', color: 'action' })}
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Chip
              key={index}
              label={item}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 1,
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary
              }}
            />
          ))
        ) : (
          <Typography variant="caption" color="text.disabled">
            Not specified
          </Typography>
        )}
      </Stack>
    </Stack>
  );

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Profile Column - Now includes company name */}
          <Grid item xs={12} md={3}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={profileImage || '/default-user.jpg'}
                alt={`${firstName} ${lastName}`}
                sx={{
                  width: 100,
                  height: 100,
                  border: `2px solid ${theme.palette.success.main}`
                }}
              />
              <Box textAlign="center">
                <Typography variant="h6" fontWeight="600">
                  {`${firstName} ${lastName}`}
                </Typography>
                <Typography variant="body2" color="primary" fontWeight="500">
                  {title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                  <BusinessIcon color="action" fontSize="small" />
                  <Typography variant="caption" color="text.secondary">
                    {companyName}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Info Column - Now includes bio */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="500">
                About Agent
              </Typography>
              
              {/* Bio Section */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <InfoIcon color="success" fontSize="small" />
                  <Typography variant="body2" fontWeight="500">Bio</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {bio}
                </Typography>
              </Box>

              {renderInfoItem(
                <OfficeIcon />,
                officeAddress,
                officeHours
              )}

              <Collapse in={showContact}>
                <Box>
                  {renderInfoItem(<EmailIcon />, email)}
                  {renderInfoItem(<PhoneIcon />, phone)}
                </Box>
              </Collapse>

              <Button
                variant="text"
                size="small"
                onClick={() => setShowContact(prev => !prev)}
                sx={{ alignSelf: 'flex-start', mt: 1, textTransform: 'none' }}
              >
                {showContact ? 'Hide Contact Info' : 'Show Contact Info'}
              </Button>
            </Stack>
          </Grid>

          {/* Stats Column */}
          <Grid item xs={12} md={3}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="500">
                Professional Details
              </Typography>
              {renderInfoItem(
                <WorkIcon />,
                `${activeListings.length} Active Listings`,
                null,
                'success.main'
              )}
              {renderInfoItem(
                <PeopleIcon />,
                `Team of ${teamSize}`,
                'Collaborative network'
              )}
              {isVerified && renderInfoItem(
                <VerifiedIcon />,
                'Verified Agent',
                'Identity confirmed',
                'success.main'
              )}
            </Stack>
          </Grid>

          {/* Action Column */}
          <Grid item xs={12} md={2}>
            <Stack spacing={2} justifyContent="space-between" height="100%">
              <Box>
                {isVerified && (
                  <Chip
                    icon={<VerifiedIcon fontSize="small" />}
                    label="Verified"
                    color="success"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                )}
                <Chip
                  icon={<BusinessIcon fontSize="small" />}
                  label={companyName}
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Box>

              <Stack spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 1,
                    py: 1,
                    textTransform: 'none'
                  }}
                  href={`mailto:${email}`}
                >
                  Contact Agent
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 1,
                    py: 1,
                    textTransform: 'none'
                  }}
                >
                  View Portfolio
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Footer with Specializations */}
      <Box
        sx={{
          bgcolor: theme.palette.grey[100],
          px: 3,
          py: 2,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1.5, sm: 3 }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: theme.palette.divider,
                display: { xs: 'none', sm: 'block' }
              }}
            />
          }
          sx={{
            alignItems: { sm: 'center' },
            '& > *': {
              flexShrink: 0,
              overflow: 'hidden'
            }
          }}
        >
          {renderFooterChips(
            specialties, 
            <CategoryIcon sx={{ color: 'green' }} />, 
            'Specialties')}
          {renderFooterChips(
            languages, 
            <LanguageIcon
            sx={{ color: 'green' }}
            />, 
            'Languages',
            
          )}
          {renderFooterChips(
            serviceAreas, 
            <MapIcon sx={{ color: 'green' }} />, 
            'Service Areas',
            { sx: { border: '2px solid green', borderRadius: '4px' } }
          )}
        </Stack>
      </Box>
    </Paper>
  );
};

export default AgentCard;