import User from "../models/User.js";
import Property from "../models/Property.js";

// Add a property to wishlist
export const addToWishlist = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can add properties to wishlist." });
    }

    const { propertyId } = req.params;

    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Get the logged-in client
    const client = await User.findById(req.user.id);

    // Check if already saved
    if (client.savedListings.includes(propertyId)) {
      return res.status(400).json({ message: "Property already in wishlist." });
    }

    client.savedListings.push(propertyId);
    await client.save();

    res.status(201).json({ message: "Property added to wishlist", savedListings: client.savedListings });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error: error.message });
  }
};

// Remove a property from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can remove properties from wishlist." });
    }

    const { propertyId } = req.params;

    const client = await User.findById(req.user.id);

    // Check if the property exists in the wishlist
    if (!client.savedListings.includes(propertyId)) {
      return res.status(400).json({ message: "Property not in wishlist." });
    }

    client.savedListings = client.savedListings.filter((id) => id.toString() !== propertyId);
    await client.save();

    res.status(200).json({ message: "Property removed from wishlist", savedListings: client.savedListings });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error: error.message });
  }
};

// Get all wishlist items for a client
export const getWishlist = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can view wishlist." });
    }

    const client = await User.findById(req.user.id).populate("savedListings");

    res.status(200).json(client.savedListings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
};
