import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgentInquiries } from "../../redux/inquiry/inquiriesSlice";
import ReplyIcon from "@mui/icons-material/Reply";
import ReplyModalForm from "../../components/ReplyModalForm";
import { toast } from "react-toastify";

const AgentInquiries = () => {
  const dispatch = useDispatch();
  const { inquiries, loading } = useSelector((state) => state.agentInquiries);
  const { user } = useSelector((state) => state.auth);

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAgentInquiries(user.user._id))
    .unwrap()
    .then(() => toast.success("Inquiries fetched successfully"))
      .catch((err) => toast.error(err));
  }, [dispatch, user]);


  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "client",
      headerName: "Client",
      flex: 1,
      valueGetter: (params) =>{
          return `${params?.firstName} ${params?.lastName}`;
      },
    },
    {
      field: "message",
      headerName: "Inquiry Message",
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "replyAction",
      headerName: "Reply",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => {
            setSelectedInquiry(params.row);
            setModalOpen(true);
          }}
        >
          <ReplyIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Client Inquiries
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : inquiries.length === 0 ? (
          <Alert severity="info">No inquiries available.</Alert>
        ) : (
          <DataGrid
            rows={inquiries}
            columns={columns}
            getRowId={(row) => row._id}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1e824c",
                color: "#033",
                fontWeight: "bold",
              },
              borderRadius: 2,
            }}
          />
        )}
      </Paper>

      {selectedInquiry && (
        <Box>
          <ReplyModalForm
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            inquiry={selectedInquiry}
          />
        </Box>
      )}
    </Box>
  );
};

export default AgentInquiries;
