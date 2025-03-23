import { useLocation } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";  // Sidebar + AppBar
import PublicLayout from "./PublicLayout";  // Navbar + Footer

const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  // Define routes that should use the Dashboard layout
  const dashboardRoutes = ["/agent", "/admin", "/client"];

  // Check if the current route starts with any of these paths
  const isDashboard = dashboardRoutes.some(route => location.pathname.startsWith(route));

  return isDashboard ? <DashboardLayout role="agent" title="Agent Dashboard">{children}</DashboardLayout> : <PublicLayout>{children}</PublicLayout>;
};

export default LayoutWrapper;
