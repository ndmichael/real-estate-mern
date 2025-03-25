import express from "express";
import { createProperty, getAllProperties } from "../controllers/propertyController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("agent"), createProperty); // Only agents can create properties
router.get("/", protect, getAllProperties); // Agents see their own listings, others see all
router.get("/my-listings", protect, authorize("agent"), getMyProperties);

export default router;
