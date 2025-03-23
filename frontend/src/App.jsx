import './App.css'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
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

function App() {

  return (
    <Router>
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
    </Router>
  )
}

export default App
