import Property from "../models/Property.js";


export const createProperty = async (req, res) => {
  try {
    // Ensure only agents can create properties
    if (req.user.role !== "agent") {
      return res.status(403).json({ message: "Access denied: Only agents can create properties." });
    }

    // Ensure the agent is verified
    if (!req.user.isVerified) {
      return res.status(403).json({ message: "Access denied: Only verified agents can post listings." });
    }

    // Extract property details from request body
    const {
      title,
      description,
      category,
      price,
      location,
      bedrooms,
      bathrooms,
      toilets,
      images,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !price || !location || !bedrooms || !bathrooms || !toilets || !images) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate category type
    const validCategories = ["rent", "buy", "shortlet"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category. Choose from: rent, buy, shortlet." });
    }

    // Validate number of images (Max: 4)
    if (images.length > 4) {
      return res.status(400).json({ message: "You can upload a maximum of 4 images." });
    }

    // ✅ Create property
    const property = await Property.create({
      agent: req.user.id, // Associate property with logged-in agent
      title,
      description,
      category,
      price,
      location,
      bedrooms,
      bathrooms,
      toilets,
      images,
      isAvailable: true, // Default availability
      isFeatured: false, // Default featured status
    });

    res.status(201).json({ message: "Property created successfully!", property });

  } catch (error) {
    res.status(500).json({ message: "Error creating property", error: error.message });
  }
};


// Public Route: Get all properties (Everyone sees all)
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("agent", "firstName lastName email");
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

// Dashboard Route: Get agent’s own properties (Agents Only)
export const getMyProperties = async (req, res) => {
  try {
    if (req.user.role !== "agent") {
      return res.status(403).json({ message: "Access denied: Only agents can view their own listings." });
    }

    const properties = await Property.find({ agent: req.user.id }).populate("agent", "firstName lastName email");

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your properties", error });
  }
};

// Update Property (Only by the agent who created it)
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if the logged-in agent is the owner of the property
    if (property.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: You can only update your own properties." });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ message: "Property updated successfully", updatedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error: error.message });
  }
};

// Delete Property (Only by the agent who created it)
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if the logged-in agent is the owner of the property
    if (property.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: You can only delete your own properties." });
    }

    await property.deleteOne();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error: error.message });
  }
};

