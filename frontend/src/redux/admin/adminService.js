// src/redux/admin/adminService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/admin";

// Get dashboard stats
const fetchDashboardStats = async (token) => {
  const res = await axios.get(`${BASE_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`res dashboard: ${res.data}`)
  return res.data;
};

// Get all users
const getAllUsers = async (token) => {
  const res = await axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Delete a user
const deleteUser = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Get all listings
const getAllListings = async () => {
  const res = await axios.get(`${BASE_URL}/listings`);
  return res.data;
};

// Get all unverified agents
const getUnverifiedAgents = async (token) =>{
  const res = await axios.get(`${BASE_URL}/agents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// Verify agent
const verifyAgent = async (id, token) => {
  const res = await axios.put(`${BASE_URL}/agents/verify/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const adminService = {
  fetchDashboardStats,
  getAllUsers,
  deleteUser,
  getAllListings,
  getUnverifiedAgents,
  verifyAgent,
};

export default adminService;
