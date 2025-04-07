import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    const userId = req.user.id; // or however you store auth

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        phone,
        ...(profileImage && { profileImage }), // only update if exists
      },
      { new: true }
    );

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/users/agents
export const getVerifiedAgents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [agents, total] = await Promise.all([
    User.find({ role: "agent", isVerified: true })
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .select("-password"),
    User.countDocuments({ role: "agent", isVerified: true }),
  ]);

  res.json({ agents, total });
};

