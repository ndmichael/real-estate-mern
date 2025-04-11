import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInquiries } from "../../redux/admin/inquiriesSlice";

const AdminAllInquiries = () => {
  const dispatch = useDispatch();
  const { inquiries, loading } = useSelector((state) => state.inquiries);

  useEffect(() => {
    dispatch(fetchAllInquiries());
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "property",
      headerName: "Property ID",
      flex: 1,
      valueGetter: (params) => {
        return `${params?._id}`;
      },
    },
    {
      field: "client",
      headerName: "Client",
      flex: 1,
      valueGetter: (params) =>
        // params?.row?.client?.fullName ||
        // `${params?.firstName || ""} ${params?.lastName || ""}` ||
        // "N/A",
        {
          return `${params?.firstName} ${params?.lastName}`;
        }
    },
    {
      field: "agent",
      headerName: "Agent",
      flex: 1,
      valueGetter: (params) =>
        params?.row?.agent?.fullName ||
        `${params?.firstName || ""} ${params?.lastName || ""}` ||
        "N/A",
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        All Inquiries
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={5}>
            <CircularProgress />
          </Box>
        ) : inquiries.length === 0 ? (
          <Alert severity="info">No inquiries found.</Alert>
        ) : (
          <DataGrid
            rows={inquiries || []}
            columns={columns}
            getRowId={(row) => row._id}

            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1e824a",  // Background color for column headers
                color: "#000",               // Set the text color to black for better visibility
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                color: "#333",               // Text color for cells
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f9f9f9",  // Hover color for rows
              },
              borderRadius: 2,
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default AdminAllInquiries;
