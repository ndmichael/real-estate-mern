import { useState } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import AddHomeIcon from "@mui/icons-material/AddHome";
// import EditIcon from "@mui/icons-material/Edit";
// import MessageIcon from "@mui/icons-material/Message";
// import StarIcon from "@mui/icons-material/Star";
// import SettingsIcon from "@mui/icons-material/Settings";

// import { Home, ListAlt, Add, AdminPanelSettings, Person, Menu, Logout } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  FormatListBulleted as FormatListBulletedIcon,
  AddHome as AddHomeIcon,
  Edit as EditIcon,
  Message as MessageIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Home,
  ListAlt,
  AdminPanelSettings,
  Person,
  Menu,
  Logout,
} from "@mui/icons-material";
import { Link } from "react-router-dom";



const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = {
    agent: [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/agent/dashboard" },
      { text: "My Listings", icon: <FormatListBulletedIcon />, path: "/agent/mylistings" },
      { text: "Add Property", icon: <AddHomeIcon />, path: "/agent/property/add" },
      { text: "Edit Property", icon: <EditIcon />, path: "/agent/property/edit" },
      { text: "Leads & Messages", icon: <MessageIcon />, path: "/agent/messages" },
      { text: "Featured Listings", icon: <StarIcon />, path: "/agent/featured" },
      { text: "Reviews & Ratings", icon: <StarIcon />, path: "/agent/reviews" },
      { text: "Profile & Settings", icon: <SettingsIcon />, path: "/agent/profile" },
    ],
    client: [
      { text: "Dashboard", icon: <Home />, path: "/client/dashboard" },
      { text: "Saved Properties", icon: <ListAlt />, path: "/client/saved-properties" },
      { text: "Profile", icon: <Person />, path: "/client/profile" },
    ],
    admin: [
      { text: "Admin Dashboard", icon: <AdminPanelSettings />, path: "/admin/dashboard" },
      { text: "Manage Users", icon: <Person />, path: "/admin/manage-users" },
      { text: "Manage Listings", icon: <ListAlt />, path: "/admin/manage-listings" },
    ],
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 240 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? 240 : 70,
          transition: "width 0.3s ease-in-out",
        },
      }}
    >
      <IconButton onClick={toggleDrawer} sx={{ margin: 1 }}>
        <Menu />
      </IconButton>
      <Divider />
      <List>
        {menuItems[role]?.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {isOpen && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><Logout /></ListItemIcon>
          {isOpen && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
