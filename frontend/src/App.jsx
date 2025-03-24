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
import AgentDashboard from './pages/agents/AgentDashboard';
import LayoutWrapper from './layouts/LayoutWrapper';
import MyListings from './pages/agents/MyListings';
import AddProperty from './pages/agents/AddProperty';
import EditProperty from './pages/agents/EditProperty';

import { createTheme, ThemeProvider } from "@mui/material/styles";


// Create a theme to disable hover styles
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent", // No hover color
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "inherit",
          "&:hover": {
            backgroundColor: "transparent", // No hover color
            color: "inherit"
          },
        },
      },
    },
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
      <ThemeProvider theme={theme}>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Agent Routes */}
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/agent/mylistings" element={<MyListings />} />
            <Route path="/agent/property/add" element={<AddProperty />} />
            <Route path="/agent/property/edit" element={<EditProperty />} />
          </Routes>
        </LayoutWrapper>
      </ThemeProvider>
    </Router>
  )
}

export default App
