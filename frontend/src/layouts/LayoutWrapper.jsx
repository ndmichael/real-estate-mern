import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "./DashboardLayout";
import PublicLayout from "./PublicLayout";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Get role from user if exists
  const userRole = user?.role || null;

  // Determine role based on path if no user role
  let role = userRole;
  if (!role) {
    if (location.pathname.startsWith("/agent")) {
      role = "agent";
    } else if (location.pathname.startsWith("/admin")) {
      role = "admin";
    } else if (location.pathname.startsWith("/client")) {
      role = "client";
    }
  }

  // Add a condition to use PublicLayout for specific routes
  // For example, if you want /agents to always use PublicLayout:
  if (location.pathname === "/agents" || location.pathname === "/agents/") {
    return <PublicLayout>{children}</PublicLayout>;
  }

  // If no role is found, fallback to PublicLayout
  if (!role) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  // Otherwise use DashboardLayout
  return (
    <DashboardLayout role={role} title={`${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`}>
      {children}
    </DashboardLayout>
  );
};

export default LayoutWrapper;