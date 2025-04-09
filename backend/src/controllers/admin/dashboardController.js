import User from "../../models/User.js";
import Property from "../../models/Property.js";
import Inquiry from "../../models/Inquiry.js";

export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const agents = await User.countDocuments({ role: "agent" });
  const properties = await Property.countDocuments();
  const inquiries = await Inquiry.countDocuments();

  res.json({ users, agents, properties, inquiries });
};
