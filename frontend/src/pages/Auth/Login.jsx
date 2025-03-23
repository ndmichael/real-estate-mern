import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Validation Schema for Login
const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Backend authentication will determine role
    const fakeUserRole = "agent"; // Simulated user role

    if (fakeUserRole === "admin") {
      navigate("/admin-dashboard");
    } else if (fakeUserRole === "agent") {
      navigate("/agent-dashboard");
    } else {
      navigate("/client-dashboard");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", my: 8 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" type="email" fullWidth margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label="Password" type="password" fullWidth margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
    </Box>
  );
};

export default Login;
