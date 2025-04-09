import { useEffect } from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
  Tooltip, 
  Paper, 
  CircularProgress, 
  Button, 
  Alert 
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, CheckCircle, Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getUnverifiedAgents, verifyAgent } from "../../redux/admin/agentsSlice";
import { toast } from "react-toastify";

const ManageAgents = () => {
  const dispatch = useDispatch();

  const { agents, loading, error } = useSelector((state) => state.adminAgents);

  // Fetch all agents when the component is mounted
  useEffect(() => {
    dispatch(getUnverifiedAgents());
  }, [dispatch]);

  // Handle the verification of an agent
  const handleVerify = async (id) => {
    const confirmed = window.confirm("Are you sure you want to verify this agent?");
    if (confirmed) {
      const res = await dispatch(verifyAgent(id));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Agent verified successfully");
        dispatch(getUnverifiedAgents()); // Refetch agents after verification
      } else {
        toast.error("Failed to verify agent");
      }
    }
  };


  // Columns for DataGrid
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "isVerified", headerName: "Verified", flex: 1, renderCell: (params) => (
        <Typography color={params.row.isVerified ? "green" : "gray"}>{params.row.isVerified ? "Verified" : "Not Verified"}</Typography>
    ) },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Verify Agent">
            <IconButton
              color="primary"
              onClick={() => handleVerify(params.row._id)}
              disabled={params.row.isVerified}
            >
              <CheckCircle />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Agents
      </Typography>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Failed to load agents</Typography>
        ) : agents.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            No pending unverified agents
          </Alert>
        ): (
          <DataGrid
            rows={agents || []}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
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

export default ManageAgents;
