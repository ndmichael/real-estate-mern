import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';  // Import bcrypt
import User from './src/models/User.js';  // Adjust paths as needed

dotenv.config(); // Load MONGO_URI

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

// Utility to generate ObjectId
const ObjectId = mongoose.Types.ObjectId;

// ========================
// Agents
// ========================
const agents = [
  {
    _id: new ObjectId(),
    firstName: "Grace",
    lastName: "Ifeoma",
    email: "grace.agent@example.com",
    password: "Password123", // plain password
    phone: "08031234567",
    role: "agent",
    isVerified: true,
    agentDetails: {
      companyName: "Urban Nest Realty",
      licenseNumber: "LIC1001",
      bio: "Top-rated property expert in Lagos.",
      officeAddress: "23 Allen Avenue, Ikeja",
      specialties: ["Residential", "Luxury"],
      serviceAreas: ["Lagos"],
      teamSize: 4
    }
  },
  {
    _id: new ObjectId(),
    firstName: "Emeka",
    lastName: "Obinna",
    email: "emeka.agent@example.com",
    password: "Password123",
    phone: "08022334455",
    role: "agent",
    isVerified: true,
    agentDetails: {
      companyName: "Naija Homes",
      licenseNumber: "LIC1002",
      bio: "Helping families find homes for 10+ years.",
      officeAddress: "15 Admiralty Way, Lekki",
      specialties: ["Rentals", "Commercial"],
      serviceAreas: ["Lekki", "Ajah"],
      teamSize: 3
    }
  },
  {
    _id: new ObjectId(),
    firstName: "Kemi",
    lastName: "Adewale",
    email: "kemi.agent@example.com",
    password: "Password123",
    phone: "08099887766",
    role: "agent",
    isVerified: false,
    agentDetails: {
      companyName: "Kemi Homes",
      licenseNumber: "LIC1003",
      bio: "Upcoming property agent in Ibadan.",
      officeAddress: "10 Bodija Road, Ibadan",
      specialties: ["Residential"],
      serviceAreas: ["Ibadan"],
      teamSize: 1
    }
  },
  {
    _id: new ObjectId(),
    firstName: "Ahmed",
    lastName: "Yusuf",
    email: "ahmed.agent@example.com",
    password: "Password123",
    phone: "08044556677",
    role: "agent",
    isVerified: false,
    agentDetails: {
      companyName: "Prime Realty",
      licenseNumber: "LIC1004",
      specialties: ["Land", "Commercial"],
      serviceAreas: ["Abuja"],
      teamSize: 2
    }
  },
  {
    _id: new ObjectId(),
    firstName: "Tosin",
    lastName: "Bello",
    email: "tosin.agent@example.com",
    password: "Password123",
    phone: "08077889900",
    role: "agent",
    isVerified: false,
    agentDetails: {
      companyName: "Tosin Real Estate",
      licenseNumber: "LIC1005",
      specialties: ["Shortlet"],
      serviceAreas: ["Lagos Island"],
      teamSize: 1
    }
  }
];

// ========================
// Clients
// ========================
const clients = Array.from({ length: 10 }).map((_, i) => ({
  firstName: `Client${i + 1}`,
  lastName: `Lastname${i + 1}`,
  email: `client${i + 1}@example.com`,
  password: "Password123",
  phone: `08010000${i + 10}`,
  role: "client"
}));

// ========================
// Helper function to hash passwords
// ========================
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// ========================
// Seeding Process
// ========================
const agentsWithHashedPasswords = await Promise.all(
  agents.map(async (agent) => {
    agent.password = await hashPassword(agent.password);
    return agent;
  })
);

const clientsWithHashedPasswords = await Promise.all(
  clients.map(async (client) => {
    client.password = await hashPassword(client.password);
    return client;
  })
);

await User.deleteMany({});
await User.insertMany([...agentsWithHashedPasswords, ...clientsWithHashedPasswords]);

console.log("🌱 Seeding complete!");
process.exit(0);
