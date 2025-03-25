import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
