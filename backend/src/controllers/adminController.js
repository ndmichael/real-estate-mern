import User from "../models/User.js";
import Inquiry from "../models/Inquiry.js";
import Property from "../models/Property.js";

export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const agents = await User.countDocuments({ role: "agent" });
  const properties = await Property.countDocuments();
  const inquiries = await Inquiry.countDocuments();

  res.json({ users, agents, properties, inquiries });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "client" });
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
};

export const getAllAgents = async (req, res) => {
  const agents = await User.find({ role: "agent" });
  res.json(agents);
};

export const getAllInquiries = async (req, res) => {
  const inquiries = await Inquiry.find()
      .populate("property")
      .populate("client")
      .populate("agent");
  console.log("inquiries: ", inquiries)
  res.json(inquiries);
};

export const updateInquiryStatus = async (req, res) => {
  const { status } = req.body;
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

  inquiry.status = status;
  await inquiry.save();

  res.json({ message: "Inquiry status updated" });
};

export const getFeaturedListings = async (req, res) => {
  const listings = await Property.find({ isFeatured: true });
  res.json(listings);
};

export const toggleFeaturedListing = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });

  property.isFeatured = !property.isFeatured;
  await property.save();

  res.json({ message: `Listing ${property.isFeatured ? "marked as featured" : "removed from featured"}` });
};
