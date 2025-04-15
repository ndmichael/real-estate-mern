// routes/inquiryRoutes.js
import express from "express";
import { 
    createInquiry, 
    getClientInquiries, 
    getAgentInquiries, 
    replyToInquiry
} from "../controllers/inquiry/propertyInquiry.js";

const router = express.Router();

// Create a new inquiry
router.post("/create", createInquiry);

// Get all inquiries for a client
router.get("/client/:clientId", getClientInquiries);

// Get all inquiries for an agent
router.get("/agent/:agentId", getAgentInquiries);

// Update inquiry status (e.g., 'pending' to 'replied')
router.put("/reply/:id", replyToInquiry);

export default router;
