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
  Tooltip
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

import LogoutButton from '../../components/LogoutButton';



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
      { text: "Leads & Messages", icon: <MessageIcon />, path: "/agent/messages" },
      // { text: "Featured Listings", icon: <StarIcon />, path: "/agent/featured" },
      // { text: "Reviews & Ratings", icon: <StarIcon />, path: "/agent/reviews" },
      { text: "Profile & Settings", icon: <SettingsIcon />, path: "/agent/profile" },
    ],
    client: [
      { text: "Dashboard", icon: <Home />, path: "/client/dashboard" },
      { text: "Saved Properties", icon: <ListAlt />, path: "/client/saved-properties" },
      { text: "inquiries", icon: <Person />, path: "/client/inquiries" },
      { text: "Profile", icon: <Person />, path: "/client/profile" },
    ],
    admin: [
      { text: "Admin Dashboard", icon: <AdminPanelSettings />, path: "/admin/dashboard" },
      { text: "Manage Users", icon: <Person />, path: "/admin/manage-users" },
      { text: "Manage Agents", icon: <Person />, path: "/admin/manage-agents" },
      { text: "View Inquiries", icon: <ListAlt />, path: "/admin/manage-inquiries" },
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
          <Tooltip
            key={item.text}
            title={!isOpen ? item.text : ""}
            placement="right"
            arrow
          >
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isOpen && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><Logout /></ListItemIcon>
          {isOpen && <LogoutButton />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
