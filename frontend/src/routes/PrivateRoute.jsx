import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />; // Redirect if not logged in
  if (!allowedRoles.includes(user.user.role)) return <Navigate to="/unauthorized" replace />; // Restrict access

  return <Outlet />;
};

export default PrivateRoute;



