import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import { TextField, Button, Box, Typography, CircularProgress, Alert } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (result.meta.requestStatus === "fulfilled") {
      // Navigate to the user's dashboard based on role
      const role = result.payload.user.role;
      if (role) {
        navigate(`/${role}/dashboard`);
      } else {
        
        navigate("/"); // Fallback route
      }
    } 
  };

  return (
    <Box sx={{ width: 350, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">Login</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
