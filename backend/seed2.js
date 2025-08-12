// seed2.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import Property from './src/models/Property.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// --- Name data ---
const nigerianFirstNames = ["Chinedu", "Amaka", "Oluwaseun", "Ngozi", "Babatunde", "Ifeoma", "Kehinde", "Folake", "Chuka", "Temitope"];
const foreignFirstNames = ["James", "Sophia", "Liam", "Emma", "Noah", "Isabella", "Oliver", "Mia", "Lucas", "Charlotte"];
const nigerianLastNames = ["Okafor", "Adebayo", "Eze", "Ogunleye", "Obi", "Balogun", "Uche", "Akinola", "Nwosu", "Adedoyin"];
const foreignLastNames = ["Smith", "Johnson", "Brown", "Williams", "Taylor", "Anderson", "Clark", "Lopez", "Harris", "Lewis"];

// --- Location data ---
const citiesAndStates = [
  { city: "Lagos", state: "Lagos" },
  { city: "Abuja", state: "FCT" },
  { city: "Port Harcourt", state: "Rivers" },
  { city: "Enugu", state: "Enugu" },
  { city: "Ibadan", state: "Oyo" },
  { city: "Abeokuta", state: "Ogun" },
  { city: "Benin City", state: "Edo" },
  { city: "Owerri", state: "Imo" }
];

const categories = ["rent", "buy", "shortlet"];

// property images (random)
// const propertyImages = [
//   "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1572120360610-d971b9b78825?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1600585154154-4f3c2b0b8d7c?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1628744878911-c78b32eafbc7?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1600585153934-c7f229b3b9c1?auto=format&fit=crop&w=1200&q=80",
//   "https://images.unsplash.com/photo-1599423300742-8f3b0a3e0f7d?auto=format&fit=crop&w=1200&q=80"
// ];

const propertyImages = [
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", 
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/37347/house-home-detail-interior-37347.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/3807680/pexels-photo-3807680.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1190773/pexels-photo-1190773.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/37347/house-home-detail-interior-37347.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/3807680/pexels-photo-3807680.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1190773/pexels-photo-1190773.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/3807680/pexels-photo-3807680.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
];



// --- Descriptions ---
const descriptions = [
  "A beautiful property located in a serene environment, close to essential amenities.",
  "Spacious and modern home perfect for family living.",
  "Affordable property with great investment potential.",
  "Luxury apartment with state-of-the-art facilities.",
  "Well-maintained property in a prime location.",
  "A perfect blend of comfort and elegance, ideal for your dream home.",
  "Newly renovated with high-end finishes and fittings.",
  "Prime location with easy access to schools, shops, and transport.",
  "Enjoy breathtaking views from your private balcony.",
  "Secure and gated community for peace of mind.",
  "Designed for modern living with open floor plans and natural light.",
  "Ample parking space and a large compound.",
  "Close to recreational centers and parks."
];

// --- Helpers ---
const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const getRandomImages = () => [...propertyImages].sort(() => 0.5 - Math.random()).slice(0, 4);
const generateRandomName = () => {
  const useNigerian = Math.random() > 0.5;
  return {
    firstName: useNigerian ? getRandomItem(nigerianFirstNames) : getRandomItem(foreignFirstNames),
    lastName: useNigerian ? getRandomItem(nigerianLastNames) : getRandomItem(foreignLastNames),
  };
};
const generateRandomEmail = (firstName, lastName) => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${getRandomItem(domains)}`;
};
const generateRandomPhone = () => {
  const randomNum = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `0${randomNum.toString().slice(0, 10)}`;
};
const generateCoordinates = () => ({
  longitude: (Math.random() * (7.5 - 3.5) + 3.5).toFixed(6),
  latitude: (Math.random() * (13.5 - 4.0) + 4.0).toFixed(6)
});

// --- Seed function ---
const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await User.deleteMany({});
    await Property.deleteMany({});
    console.log("🗑️ Cleared existing collections");

    const hashedPassword = await bcrypt.hash("Password123", 10);

    // --- Admin ---
    const adminName = generateRandomName();
    await User.create({
      ...adminName,
      email: generateRandomEmail(adminName.firstName, adminName.lastName),
      password: hashedPassword,
      phone: generateRandomPhone(),
      role: "admin",
      isVerified: true
    });

    // --- Agents ---
    let agents = [];
    for (let i = 0; i < 10; i++) {
      const name = generateRandomName();
      const agent = await User.create({
        ...name,
        email: generateRandomEmail(name.firstName, name.lastName),
        password: hashedPassword,
        phone: generateRandomPhone(),
        role: "agent",
        isVerified: i < 7, // First 7 are verified
        agentDetails: {
          companyName: `${name.lastName} Realty`,
          licenseNumber: `LIC${1000 + i}`,
          specialties: ["Residential", "Commercial"],
          serviceAreas: ["Lagos", "Abuja"],
          languages: ["English"]
        },
        activeListings: []
      });
      agents.push(agent);
    }

    // --- Properties for verified agents ---
    for (let agent of agents.slice(0, 7)) {
      const agentPropertyIds = [];
      for (let j = 0; j < 6; j++) {
        const { city, state } = getRandomItem(citiesAndStates);
        const coords = generateCoordinates();
        const category = getRandomItem(categories);

        const property = await Property.create({
          agent: agent._id,
          title: `${category === "rent" ? "For Rent" : category === "buy" ? "For Sale" : "Shortlet"} - ${city}`,
          description: getRandomItem(descriptions),
          category,
          price: category === "buy"
            ? Math.floor(Math.random() * 50000000) + 5000000
            : Math.floor(Math.random() * 3000000) + 200000,
          location: {
            city,
            state,
            address: `${Math.floor(Math.random() * 100)} ${getRandomItem(["Allen Avenue", "Broad Street", "Lekki Phase 1", "Garki Road", "Opebi Road"])}`,
            longitude: coords.longitude,
            latitude: coords.latitude
          },
          bedrooms: Math.floor(Math.random() * 5) + 1,
          bathrooms: Math.floor(Math.random() * 4) + 1,
          toilets: Math.floor(Math.random() * 4) + 1,
          images: getRandomImages(),
          isAvailable: true,
          isFeatured: Math.random() > 0.7
        });

        agentPropertyIds.push(property._id);
      }
      agent.activeListings = agentPropertyIds;
      await agent.save();
    }

    // --- Clients ---
    for (let i = 0; i < 20; i++) {
      const name = generateRandomName();
      await User.create({
        ...name,
        email: generateRandomEmail(name.firstName, name.lastName),
        password: hashedPassword,
        phone: generateRandomPhone(),
        role: "client",
        isVerified: true
      });
    }

    console.log("🎯 Seeding completed successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
