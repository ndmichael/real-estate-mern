import express from "express";
import upload from "../middlewares/uploadMiddleware.js"
import { 
    createProperty, 
    getAllProperties, 
    getMyProperties, 
    updateProperty,
    deleteProperty,
    getPropertyById 
} from "../controllers/propertyController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", protect, authorize("agent"), upload.array('images', 4), createProperty); // Only agents can create properties
router.get("/", getAllProperties); // Agents see their own listings, others see all
router.get("/my-listings", protect, authorize("agent"), getMyProperties);
router.put("/:id", protect, authorize("agent"), updateProperty); // Update property
router.delete("/:id", protect, authorize("agent"), deleteProperty); // Delete property
router.get("/:id", getPropertyById);

export default router;
