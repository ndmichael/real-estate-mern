import Property from "../models/Property.js";
import { uploadImages } from "../utils/cloudinaryUpload.js"; 


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

    console.log('Request body:', req.body); // Check if form data is coming in properly

    // Extract property details from request body
    const {
      title,
      description,
      category,
      price,
      location,
      bedrooms,
      bathrooms,
      toilets
    } = req.body;

    // Extract uploaded images
    const images = req.files; 
    

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

    const uploadedImages = await uploadImages(images);

    // Create property
    const property = await Property.create({
      agent: req.user.id, // Associate property with logged-in agent
      title,
      description,
      category,
      price,
      location: JSON.parse(location),
      bedrooms,
      bathrooms,
      toilets,
      images: uploadedImages,
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
    const properties = await Property.find()
                      .populate("agent", "firstName lastName email")
                      .sort({ createdAt: -1 }) ;
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

    const properties = await Property.find({ agent: req.user._id })
    .populate("agent", "firstName lastName email")
    .sort({ createdAt: -1 }) ;

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your properties", error });
  }
};


export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const {
      title,
      description,
      category,
      price,
      bedrooms,
      bathrooms,
      toilets,
      isAvailable,
    } = req.body;

    // Parse location and filesToDelete from JSON
    const location = req.body.location ? JSON.parse(req.body.location) : {};
    const filesToDelete = req.body.filesToDelete ? JSON.parse(req.body.filesToDelete) : [];

    // Step 1: Remove unwanted images
    property.images = property.images.filter((img) => !filesToDelete.includes(img));

    // Step 2: Upload new images if present
    if (req.files && req.files.length > 0) {
      const uploadedImageUrls = await uploadImages(req.files);
      property.images.push(...uploadedImageUrls);
    }

    // Step 3: Update fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (category) property.category = category;
    if (price) property.price = price;
    if (location) property.location = location;
    if (bedrooms) property.bedrooms = bedrooms;
    if (bathrooms) property.bathrooms = bathrooms;
    if (toilets) property.toilets = toilets;
    if (isAvailable !== undefined) property.isAvailable = isAvailable === 'true';

    const updatedProperty = await property.save();

    res.status(200).json({
      message: 'Property updated successfully',
      updatedProperty,
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Update failed', error: error.message });
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


// Public Route: Get a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("agent", "firstName lastName email");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error: error.message });
  }
};

