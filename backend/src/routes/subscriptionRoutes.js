import express from "express";
import { getSubscriptions } from "../controllers/subscriptionController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getSubscriptions);

export default router;
