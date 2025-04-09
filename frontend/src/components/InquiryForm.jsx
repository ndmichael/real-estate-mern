import React, {useState} from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createInquiry } from "../redux/inquiry/inquiriesSlice"; // Assuming you have this slice

const InquiryForm = ({ propertyId, agentId, clientId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false); // <-- Add this


  const onSubmit = async (data) => {
    const { message } = data;

    if (!message) {
      toast.error("Please enter a message");
      return;
    }

    const inquiryData = {
      propertyId,
      clientId,
      agentId,
      message,
    };

    setIsLoading(true); 

    try {
      const res = await dispatch(createInquiry(inquiryData));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Inquiry submitted successfully");
        reset(); // Clear form after success
      } else {
        toast.error("Failed to submit inquiry");
      }
    } catch (error) {
      toast.error("Something went wrong: ", error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <Box p={2} sx={{ maxWidth: 500, mx: "auto" }}>
      <Typography variant="h6">Send an Inquiry</Typography>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Your Message"
          fullWidth
          multiline
          rows={4}
          {...register("message", { required: "Message is required" })}
          error={!!errors.message}
          helperText={errors.message ? errors.message.message : ""}
          sx={{ mt: 2 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="success" 
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Inquiry"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default InquiryForm;
