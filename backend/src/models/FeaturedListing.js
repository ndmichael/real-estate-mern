const mongoose = require("mongoose");

const FeaturedListingSchema = new mongoose.Schema(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },

    duration: { type: Number, required: true }, // Duration in days (e.g., 7, 14, 30)
    amount: { type: Number, required: true },

    status: { type: String, enum: ["active", "expired"], default: "active" },
    featuredExpiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedListing", FeaturedListingSchema);
