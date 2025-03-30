import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Button variant="text" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
