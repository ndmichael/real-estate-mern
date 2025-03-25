const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Subscription Plans (For Monthly/Yearly Benefits)
    plan: { 
      type: String, 
      enum: ["free", "premium", "enterprise"], 
      required: true 
    },

    duration: { type: String, enum: ["monthly", "yearly"], required: true }, // Subscription duration

    amount: { type: Number, required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
    expiresAt: { type: Date, required: true },

    // Plan Benefits
    maxListings: { type: Number, required: true }, // Number of allowed listings
    freeFeaturedListings: { type: Number, default: 0 }, // Free featured properties
    discountOnFeatured: { type: Number, default: 0 }, // % discount on featured listings
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
