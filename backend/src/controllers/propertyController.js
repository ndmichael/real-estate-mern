import Property from "../models/Property.js";


// Create a new property (Agents Only)
export const createProperty = async (req, res) => {
    try {
      if (req.user.role !== "agent") {
        return res.status(403).json({ message: "Access denied: Only agents can create properties." });
      }
  
      const { title, description, price, location, category, images } = req.body;
  
      const property = await Property.create({
        title,
        description,
        price,
        location,
        category,
        images,
        agent: req.user.id, // Associate property with the logged-in agent
      });
  
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ message: "Error creating property", error });
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
