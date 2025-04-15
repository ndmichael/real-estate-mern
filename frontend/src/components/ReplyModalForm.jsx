import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { replyToInquiry } from "../redux/inquiry/inquiriesSlice"; // You’ll create this action

const ReplyModalForm = ({ open, onClose, inquiry }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleReply = async (data) => {
    if (!data.reply) {
      toast.error("Reply message is required");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(replyToInquiry({
        inquiryId: inquiry._id,
        replyMessage: data.reply,
      }));
      console.log("response inquiry: ", response)

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Reply sent!");
        reset();
        onClose(); // Close modal
      } else {
        toast.error("Failed to send reply");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong" );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500, bgcolor: "background.paper",
        borderRadius: 2, boxShadow: 24, p: 4
      }}>
        <Typography variant="h6" gutterBottom>Reply to Inquiry</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Original: {inquiry.message}
        </Typography>

        <form onSubmit={handleSubmit(handleReply)}>
          <TextField
            label="Reply"
            fullWidth
            multiline
            rows={4}
            {...register("reply", { required: "Reply is required" })}
            error={!!errors.reply}
            helperText={errors.reply?.message}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reply"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ReplyModalForm;
