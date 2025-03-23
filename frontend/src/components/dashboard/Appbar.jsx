import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const CustomAppBar = ({ title }) => {
  const [user] = useState({ name: "John Doe", avatar: "/avatar.png" });

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{user.name}</Typography>
          <Avatar src={user.avatar} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
