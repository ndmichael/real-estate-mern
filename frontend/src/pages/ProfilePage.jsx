import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log("Profile: ", user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email,
        phone: user.user.phone,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      for (const key in data) {
        if (key === 'profileImage' && data[key].length > 0) {
          formData.append('profileImage', data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      await dispatch(updateUserProfile(formData)).unwrap();
    } catch (error) {
      return error;
    }
  };

  if (!user) return null;

  return (
    <Box maxWidth="md" mx="auto" px={2} py={4}>
      {/* USER DETAILS SECTION */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={user.user.profileImage} alt={user.user.fullName} sx={{ width: 80, height: 80 }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h5">{user.user.fullName}</Typography>
              <Typography color="text.secondary">{user.user.email}</Typography>
              <Typography color="text.secondary">Phone: {user.user.phone}</Typography>
              <Typography color="text.secondary">Role: {user.user.role}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* EDITABLE FORM SECTION */}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button component="label" variant="outlined">
              Upload Profile Image
              <input
                type="file"
                hidden
                accept="image/*"
                {...register('profileImage')}
              />
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              {...register('firstName', { required: 'First name is required' })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              {...register('lastName', { required: 'Last name is required' })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              fullWidth
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^(\+234|0)?[0-9]{10}$/,
                  message: 'Invalid phone number',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* AGENT INFO SECTION (NON-EDITABLE) */}
      {user.user.role === 'agent' && user.user.agentDetails && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" gutterBottom>
            Agent Information
          </Typography>

          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Company Name:</strong> {user.user.agentDetails.companyName}</Typography>
                  <Typography><strong>Title:</strong> {user.user.agentDetails.title}</Typography>
                  <Typography><strong>License Number:</strong> {user.user.agentDetails.licenseNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Office Address:</strong> {user.user.agentDetails.officeAddress}</Typography>
                  <Typography><strong>Office Hours:</strong> {user.user.agentDetails.officeHours}</Typography>
                  <Typography><strong>Team Size:</strong> {user.user.agentDetails.teamSize}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Bio:</strong> {user.user.agentDetails.bio}</Typography>
                  <Typography><strong>Specialties:</strong> {user.user.agentDetails.specialties.join(', ')}</Typography>
                  <Typography><strong>Service Areas:</strong> {user.user.agentDetails.serviceAreas.join(', ')}</Typography>
                  <Typography><strong>Languages:</strong> {user.user.agentDetails.languages.join(', ')}</Typography>
                  <Typography><strong>Awards:</strong> {user.user.agentDetails.awards.join(', ') || 'None'}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
