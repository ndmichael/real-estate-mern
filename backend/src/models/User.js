import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["client", "agent", "admin"], required: true },
    profileImage: { type: String }, // Cloudinary URL or File Path
    isVerified: { type: Boolean, default: false }, // Admin verifies agents

    savedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }], // Wishlist for Clients

    agentDetails: {
      companyName: { type: String },
      licenseNumber: { type: String },
    },

    // Subscription Data
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    subscriptionExpiresAt: { type: Date, default: null },

    //  Track Free Listings for Free Plan Agents
    freeListingsRemaining: { type: Number, default: 5 }, // Resets Monthly
    lastFreeListingReset: { type: Date, default: null }, // Tracks Last Reset
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;