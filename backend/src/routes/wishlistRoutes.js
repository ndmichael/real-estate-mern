import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/:propertyId", protect, authorize("client"), addToWishlist); // Add to wishlist
router.delete("/:propertyId", protect, authorize("client"), removeFromWishlist); // Remove from wishlist
router.get("/", protect, authorize("client"), getWishlist); // View wishlist



export default router;
