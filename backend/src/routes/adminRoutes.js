import express from "express";
import {
//   getDashboardStats,
//   getAllUsers,
//   deleteUser,
  getAllAgents,
//   verifyAgent,
  getAllInquiries,
  updateInquiryStatus,
  getFeaturedListings,
  toggleFeaturedListing
} from "../controllers/adminController.js";

import { getDashboardStats } from "../controllers/admin/dashboardController.js";
import {getAllUsers, deleteUser} from "../controllers/admin/usersController.js";
import { verifyAgent } from "../controllers/admin/agentsController.js";

import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", protect, authorize("admin"), getDashboardStats);

// Users
router.get("/users", protect, authorize("admin"), getAllUsers);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

// Agents
router.get("/agents", protect, authorize("admin"), getAllAgents);
router.patch("/agents/verify/:id", protect, authorize("admin"), verifyAgent);

// Inquiries
router.get("/inquiries", protect, authorize("admin"), getAllInquiries);
router.patch("/inquiries/:id", protect, authorize("admin"), updateInquiryStatus);

// Featured
router.get("/featured", protect, authorize("admin"), getFeaturedListings);
router.patch("/featured/:id", protect, authorize("admin"), toggleFeaturedListing);

export default router;
