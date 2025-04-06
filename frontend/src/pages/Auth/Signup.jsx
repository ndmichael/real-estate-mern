import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/authSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Grid,
  Chip,
  Autocomplete
} from "@mui/material";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState("");

  // Options for dropdowns
  const specialtyOptions = [
    'Residential',
    'Commercial', 
    'Luxury',
    'Rentals',
    'Land',
    'International',
    'Senior Housing'
  ];

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'Hausa',
    'Yoruba',
    'Igbo',
    'Russian'
  ];

  const nigerianCities = [
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Kano',
    'Ibadan',
    'Enugu',
    'Aba',
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: userType,
      profileImage: data.profileImage || null,
      ...(userType === "agent" && {
        agentDetails: {
          companyName: data.companyName,
          licenseNumber: data.licenseNumber,
          title: data.title || "Real Estate Agent",
          bio: data.bio || "",
          officeAddress: data.officeAddress || "",
          officeHours: data.officeHours || "Mon-Fri 9am-5pm",
          specialties: data.specialties || [],
          serviceAreas: data.serviceAreas || [],
          languages: data.languages || ['English'],
          teamSize: data.teamSize || 1,
          awards: data.awards ? data.awards.split(',').map(award => award.trim()) : []
        }
      })
    };

    const result = await dispatch(registerUser(userData));
    if (result.meta.requestStatus === "fulfilled") {
      localStorage.setItem("token", result.payload.token);
      dispatch(loginUser(result.payload.token));
      navigate(userType === "client" ? "/client/dashboard" : "/agent/dashboard");
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          Create Account
        </Typography>

        {!userType ? (
          <Box textAlign="center">
            <Typography variant="h6" mb={2}>
              I am signing up as:
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="contained" onClick={() => setUserType("client")}>
                Client
              </Button>
              <Button variant="outlined" onClick={() => setUserType("agent")}>
                Agent
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register("firstName", { required: "First name is required" })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register("lastName", { required: "Last name is required" })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>

              {/* Contact Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email address"
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^(\+234|0)?[0-9]{10}$/,
                      message: "Invalid Nigerian phone number (must be 11 digits)"
                    }
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>

              {/* Security Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Security Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>

              {/* Agent-Specific Fields */}
              {userType === "agent" && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Professional Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      {...register("companyName", { 
                        required: "Company name is required for agents"
                      })}
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="License Number"
                      {...register("licenseNumber", { 
                        required: "License number is required for agents"
                      })}
                      error={!!errors.licenseNumber}
                      helperText={errors.licenseNumber?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Professional Title"
                      defaultValue="Real Estate Agent"
                      {...register("title")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Team Size"
                      type="number"
                      defaultValue={1}
                      inputProps={{ min: 1 }}
                      {...register("teamSize")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={3}
                      {...register("bio")}
                      helperText="Max 500 characters"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Office Address"
                      {...register("officeAddress")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Office Hours"
                      defaultValue="Mon-Fri 9am-5pm"
                      {...register("officeHours")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      multiple
                      options={specialtyOptions}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Specialties"
                          placeholder="Select specialties"
                        />
                      )}
                      onChange={(event, newValue) => {
                        setValue("specialties", newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      multiple
                      options={nigerianCities}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Service Areas (Nigerian Cities)"
                          placeholder="Select cities"
                        />
                      )}
                      onChange={(event, newValue) => {
                        setValue("serviceAreas", newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      multiple
                      options={languageOptions}
                      defaultValue={['English']}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Languages Spoken"
                          placeholder="Select languages"
                        />
                      )}
                      onChange={(event, newValue) => {
                        setValue("languages", newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Awards & Recognition"
                      helperText="Separate multiple awards with commas"
                      {...register("awards")}
                    />
                  </Grid>
                </>
              )}

              {/* Form Actions */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button variant="outlined" onClick={() => setUserType("")}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ minWidth: 120 }}
                  >
                    {loading ? <CircularProgress size={24} /> : "Sign Up"}
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography textAlign="center" sx={{ mt: 2 }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "none", color: "primary.main" }}>
                    Login
                  </Link>
                </Typography>
                {error && (
                  <Typography color="error" textAlign="center" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default Signup;