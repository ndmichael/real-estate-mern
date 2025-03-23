import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import Grid from '@mui/material/Grid2'

const Signup = () => {
  const [userType, setUserType] = useState(""); // "agent" or "client"
  const [loading, setLoading] = useState(false); // Loading state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", ""); // Watch password for confirm validation

  const onSubmit = (data) => {
    setLoading(true); // Start loading

    // Simulate API call (Replace with actual API request)
    setTimeout(() => {
      console.log("User Data:", data);
      setLoading(false); // Stop loading after "backend" response
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          Sign Up
        </Typography>

        {/* Step 1: Select User Type */}
        {!userType ? (
          <Box textAlign="center">
            <Typography variant="h6" mb={2}>
              Sign Up as:
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="contained" color="success" onClick={() => setUserType("client")}>
                Client
              </Button>
              <Button variant="outlined" color="success" onClick={() => setUserType("agent")}>
                Agent
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            {/* Step 2: User fills out the form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/* Full Name */}
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...register("fullName", { required: "Full name is required" })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                </Grid>

                {/* Email */}
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>

                {/* Phone Number */}
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    {...register("phone", { required: "Phone number is required" })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>

                {/* Password */}
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                </Grid>

                {/* Company Name (Only for Agents) */}
                {userType === "agent" && (
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      {...register("companyName", { required: "Company name is required for agents" })}
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                    />
                  </Grid>
                )}
              </Grid>

              {/* Submit & Back Buttons */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button variant="outlined" color="error" onClick={() => setUserType("")}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={loading} // Disable while loading
                  sx={{ minWidth: 120 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                </Button>
              </Box>

              {/* Already have an account? */}
              <Typography textAlign="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none", color: "green", fontWeight: "bold" }}>
                  Login
                </Link>
              </Typography>
            </form>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Signup;
