import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role, companyName, licenseNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === "client") {
      newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role,
        isActive: true, // Clients are active immediately
      });
    } else if (role === "agent") {
      newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role,
        agentDetails: {
          companyName,
          licenseNumber,
        },
        isVerified: false, // Admin must verify agents
        isActive: false, // Agents shouldn't be active until verification
      });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
