import express from "express";
import { 
    createProperty, 
    getAllProperties, 
    getMyProperties, 
    updateProperty,
    deleteProperty 
} from "../controllers/propertyController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", protect, authorize("agent"), createProperty); // Only agents can create properties
router.get("/", getAllProperties); // Agents see their own listings, others see all
router.get("/my-listings", protect, authorize("agent"), getMyProperties);
router.put("/:id", protect, authorize("agent"), updateProperty); // Update property
router.delete("/:id", protect, authorize("agent"), deleteProperty); // Delete property

export default router;
