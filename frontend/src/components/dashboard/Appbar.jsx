import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const CustomAppBar = ({ title }) => {
  const { user } = useSelector((state) => state.auth); // Get user from Redux

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4CAF50" }}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit"
          component={Link}
          to="/"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{`${user.user.firstName} ${user.user.lastName}`}</Typography>
          <Avatar src={user.user.profileImage || "/default-avatar.png"} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
