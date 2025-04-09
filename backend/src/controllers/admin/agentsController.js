import User from "../../models/User.js";


export const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent", isVerified: false });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agents", error });
  }
};


export const verifyAgent = async (req, res) => {
  const agent = await User.findById(req.params.id);
  if (!agent || agent.role !== "agent") return res.status(404).json({ message: "Agent not found" });

  agent.verified = !agent.verified;
  await agent.save();

  res.json({ message: `Agent ${agent.verified ? "verified" : "unverified"}` });
};