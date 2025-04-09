import { useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../../redux/admin/usersSlice";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const res = await dispatch(deleteUser(id));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("User deleted successfully");
        dispatch(fetchAllUsers());
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "User ID", flex: 1.2 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1.5,
      valueGetter: (params) => {
        return `${params}`;
      },
    },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value || "Unknown"}
          color={
            params.value === "admin"
              ? "error"
              : params.value === "agent"
              ? "success"
              : "primary"
          }
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Profile">
            <IconButton color="primary">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row?._id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Users
      </Typography>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Failed to load users</Typography>
        ) : (
          <DataGrid
            rows={users || []}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
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

export default ManageUsers;
