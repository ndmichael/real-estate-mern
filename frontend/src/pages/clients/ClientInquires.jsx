import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  IconButton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientInquiries } from "../../redux/inquiry/inquiriesSlice";

import InquiryDetailsModal from "../../components/InquiryDetailsModal";

const ClientInquiries = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { inquiries, loading } = useSelector((state) => state.agentInquiries); // or create a separate `clientInquiries` slice
  
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  console.log("inquires: ", inquiries)

  useEffect(() => {
    if (user?.user?._id) {
      dispatch(fetchClientInquiries(user.user._id));
    }
  }, [dispatch, user]);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "property",
      headerName: "Property",
      flex: 2,
      valueGetter: (params) => `${params?.title}`,
    },
    {
      field: "agent",
      headerName: "agent",
      flex: 2,
      valueGetter: (params) =>  
        `${params?.firstName} ${params?.lastName}`,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
    },
    {
      field: "reply",
      headerName: "Agent Reply",
      flex: 2,
      valueGetter: (params) => params || "No reply yet",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "viewDetails",
      headerName: "Details",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => {
            setSelectedInquiry(params.row);
            setDetailsModalOpen(true);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        My Inquiries
      </Typography>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : inquiries.length === 0 ? (
          <Alert severity="info">You have not sent any inquiries.</Alert>
        ) : (
          <DataGrid
            rows={inquiries}
            columns={columns}
            getRowId={(row) => row._id}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1e824c",
                color: "#3a3a3a",
                fontWeight: "bold",
              },
              borderRadius: 2,
            }}
          />
        )}
      </Paper>

      {selectedInquiry && (
        <InquiryDetailsModal
          open={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          inquiry={selectedInquiry}
        />
      )}

    </Box>
  );
};

export default ClientInquiries;
