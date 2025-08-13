import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.user.role) {
      case "admin":
        return "/admin/dashboard";
      case "agent":
        return "/agent/dashboard";
      case "client":
        return "/client/dashboard";
      default:
        return "/login"; // Fallback
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listings" },
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Shortlets", path: "/shortlet" },  // Ensure correct path
    { name: "Agents", path: "/agents" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ background: 'rgb(255, 253, 231)' , color: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section: Logo & Links */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ mr: 4, fontWeight: "bold" }}>
              SaareNaija
            </Typography>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {navItems.map((item) => (
                <Typography key={item} sx={{ cursor: "pointer", fontSize: "1rem" }}>
                  <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
                    {item.name}
                  </Link>
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Right Section: Auth Buttons */}
          {
            user?
            (<Button
              color="success"
              variant="text"
              component={Link}
              to={getDashboardLink()}
            >
              {user.user.firstName} {user.user.lastName}
            </Button>)
            :(
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <Button component={Link} to="/login" variant="outlined" color="success">Login</Button>
                <Button component={Link} to="/signup" variant="contained" color="success">Sign Up</Button>
              </Box>
            )

          }
          

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          {/* Close Button */}
          <IconButton 
            sx={{ display: "flex", 
            justifyContent: "flex-end", p: 2 }} 
            onClick={handleDrawerToggle}
          >
            <CloseIcon />
          </IconButton>

          {/* Drawer Menu */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton onClick={handleDrawerToggle}>
                  <ListItemText 
                    component={Link} 
                    to={item.path} 
                    primary={item.name} 
                    style={{ textDecoration: "none", color: "inherit" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Auth Buttons in Drawer */}
          {
            user?
            (<Button
            color="inherit"
            component={Link}
            to={getDashboardLink()}
          >
            {user.firstName} {user.lastName}
          </Button>)
          :
          (<Box sx={{ textAlign: "center", mt: 2 }}>
            <Button 
              variant="outlined" 
              color="success" 
              fullWidth sx={{ mb: 1 }}
              component={Link} 
              to="/login"
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              color="success" fullWidth
              component={Link} 
              to="/signup"
            >
              Sign Up
            </Button>
          </Box>)
          }
          
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
