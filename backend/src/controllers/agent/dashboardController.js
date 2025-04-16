// controllers/agentController.js

import Inquiry from "../../models/Inquiry.js";
import Property from "../../models/Property.js";

export const getAgentStats = async (req, res) => {
  try {
    const agentId = req.params.agentId;

    const totalInquiries = await Inquiry.countDocuments({ agent: agentId });
    const totalReplies = await Inquiry.countDocuments({ agent: agentId, status: "replied" });
    const totalProperties = await Property.countDocuments({ agent: agentId });

    res.status(200).json({
      totalInquiries,
      totalReplies,
      totalProperties,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch agent stats", error });
  }
};
