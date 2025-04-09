import User from "../../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "client" });
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
};
