// routes/agentRoutes.js

import express from "express";
import { getAgentStats } from "../controllers/agent/dashboardController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/stats/:agentId", protect,authorize("agent"), getAgentStats);

export default router;
