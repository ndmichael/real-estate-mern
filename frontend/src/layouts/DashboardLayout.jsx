import { Box } from "@mui/material";
import Sidebar from "../components/dashboard/Sidebar";
import CustomAppBar from "../components/dashboard/Appbar";

const DashboardLayout = ({ children, role, title }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role={role} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0, width: "100%" }}>
        <CustomAppBar title={title} />
        <Box py={3} sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
