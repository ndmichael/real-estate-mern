import './App.css'

import Home from './pages/Home';
import Listings from './pages/Listings';
import Buy from './pages/Buy';
import Rent from './pages/Rent';

// auth routes import
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyDetail from './pages/PropertyDetail';
import Shortlet from './pages/Shortlet';
import SearchResults from './pages/SearchResults';

import LayoutWrapper from './layouts/LayoutWrapper';

// agent imports
import AgentDashboard from './pages/agents/AgentDashboard';
import MyListings from './pages/agents/MyListings';
import AddProperty from './pages/agents/AddProperty';
import EditProperty from './pages/agents/EditProperty';
import AgentList from './pages/AgentList';


// Client import 
import ClientDashboard from './pages/clients/ClientDashboard';
import ProfileSettings from './pages/clients/ProfileSettings';
import SavedProperties from './pages/clients/SaveProperties';
import ClientInquiries from './pages/clients/ClientInquires';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import PrivateRoute from "./routes/PrivateRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProfilePage from './pages/ProfilePage';


import AdminDashboardOverview from './pages/admin/AdminDashboardOverview';
import ManageUsers from './pages/admin/ManageUsers';
import ManageFeaturedListings from './pages/admin/ManageFeaturedListings';
import ManageAgents from './pages/admin/ManageAgents';
import AdminAllInquiries from './pages/admin/AdminAllInquiries';
import AgentInquiries from './pages/agents/AgentInquiries';


// Create a theme to disable hover styles
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          color: "inherit",
          "&:hover": {
            backgroundColor: "transparent", // No hover color
            color: "inherit",
          },
        },
      },
    },
  },
});

function App() {

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <ThemeProvider theme={theme}>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/shortlet" element={<Shortlet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/agents" element={<AgentList />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/properties/search/results" element={<SearchResults />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboardOverview />} />
              <Route path="/admin/manage-users" element={<ManageUsers />} />
              <Route path="/admin/manage-agents" element={<ManageAgents />} />
              <Route path="/admin/manage-inquiries" element={<AdminAllInquiries />} />
              <Route path="/admin/manage-listings" element={<ManageFeaturedListings />} />
            </Route>

            {/* Agent Routes */}
            <Route element={<PrivateRoute allowedRoles={["agent"]} />}>
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route path="/agent/mylistings" element={<MyListings />} />
              <Route path="/agent/property/add" element={<AddProperty />} />
              <Route path="/agent/profile" element={<ProfilePage />} />
              <Route path="/agent/property/edit/:id" element={<EditProperty />} />
              <Route path="/agent/messages" element={<AgentInquiries />} />
            </Route>
            

            {/* Client Routes */}
            <Route element={<PrivateRoute allowedRoles={["client"]} />}>
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/saved-properties" element={<SavedProperties />} />
              <Route path="/client/inquiries" element={<ClientInquiries />} />
              <Route path="/client/profile" element={<ProfilePage />} />
            </Route>
            
          </Routes>
        </LayoutWrapper>
      </ThemeProvider>
    </Router>
  )
}

export default App
