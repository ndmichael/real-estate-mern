import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from "@mui/material";
  
  const InquiryDetailsModal = ({ open, onClose, inquiry }) => {
    if (!inquiry) return null;
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Inquiry Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            <strong>Message:</strong> {inquiry.message}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Reply:</strong> {inquiry.reply|| "No reply yet"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Status:</strong> {inquiry.status}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  
  export default InquiryDetailsModal;