import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      role,
      profileImage,
      agentDetails // This contains all agent-specific fields
    } = req.body;

    // Format phone number
    const formattedPhone = phone.startsWith('0') ? '+234' + phone.slice(1) : phone;

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
        phone: formattedPhone,
        role,
        profileImage,
        isActive: true,
      });
    } else if (role === "agent") {
      // Validate required agent fields
      if (!agentDetails?.companyName || !agentDetails?.licenseNumber) {
        return res.status(400).json({ 
          message: "Company name and license number are required for agents",
          receivedData: req.body // For debugging
        });
      }

      newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone: formattedPhone,
        role,
        profileImage,
        agentDetails: {
          companyName: agentDetails.companyName,
          licenseNumber: agentDetails.licenseNumber,
          title: agentDetails.title || "Real Estate Agent",
          bio: agentDetails.bio || "",
          officeAddress: agentDetails.officeAddress || "",
          officeHours: agentDetails.officeHours || "Mon-Fri 9am-5pm",
          specialties: agentDetails.specialties || [],
          serviceAreas: agentDetails.serviceAreas || [],
          languages: agentDetails.languages || ['English'],
          teamSize: agentDetails.teamSize || 1,
          awards: agentDetails.awards || []
        },
        isVerified: true,
        isActive: true,
      });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
