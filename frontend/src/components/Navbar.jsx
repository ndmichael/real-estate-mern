import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ["Home", "Listings", "Buy", "Rent", "Shortlist", "Agents"];

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#f5f5f5", color: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section: Logo & Links */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ mr: 4, fontWeight: "bold" }}>
              MyBrand
            </Typography>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {navItems.map((item) => (
                <Typography key={item} sx={{ cursor: "pointer", fontSize: "1rem" }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Right Section: Auth Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button variant="outlined" color="success">Login</Button>
            <Button variant="contained" color="success">Sign Up</Button>
          </Box>

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
          <IconButton sx={{ display: "flex", justifyContent: "flex-end", p: 2 }} onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>

          {/* Drawer Menu */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={handleDrawerToggle}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Auth Buttons in Drawer */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="outlined" color="success" fullWidth sx={{ mb: 1 }}>
              Login
            </Button>
            <Button variant="contained" color="success" fullWidth>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
