const PropertySchema = new mongoose.Schema(
    {
      agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to Agent
      title: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, enum: ["rent", "buy", "shortlet"], required: true },
      price: { type: Number, required: true },
      location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        address: { type: String, required: true },
        longitude: { type: Number },
        latitude: { type: Number },
      },
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      toilets: { type: Number, required: true },
      images: [{ type: String, required: true }], // Array of image URLs (Max: 4)
      isAvailable: { type: Boolean, default: true },

      // Featured Status (Updated when agent pays for a listing)
      isFeatured: { type: Boolean, default: false },
      featuredExpiresAt: { type: Date, default: null },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Property", PropertySchema);
  