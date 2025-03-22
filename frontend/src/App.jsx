import './App.css'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Buy from './pages/Buy';
import Rent from './pages/Rent';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
