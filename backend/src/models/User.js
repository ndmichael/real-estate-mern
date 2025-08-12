import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true, minlength: 6 },
    phone: { 
      type: String, 
      required: true,
      validate: {
        validator: function(v) {
          return /^(\+234|0)?[0-9]{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    role: { 
      type: String, 
      enum: ["client", "agent", "admin"], 
      required: true,
      default: "client"
    },
    profileImage: { type: String },
    
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    savedListings: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Property",
      default: []
    }],
    activeListings: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Property",
      default: []
    }],

    agentDetails: {
      // Basic Info
      companyName: { 
        type: String,
        required: function() { return this.role === 'agent'; }
      },
      title: { 
        type: String, 
        default: "Real Estate Agent"
      },
      bio: { 
        type: String, 
        maxlength: 500,
        default: ""
      },
      
      // Professional Credentials
      licenseNumber: { 
        type: String,
        required: function() { return this.role === 'agent'; }
      },
      
      // Contact Info
      officeAddress: { type: String, default: "" },
      officeHours: { 
        type: String, 
        default: "Mon-Fri 9am-5pm"
      },
      
      // Market Specialization
      specialties: {
        type: [String],
        enum: [
          'Residential',
          'Commercial', 
          'Luxury',
          'Rentals',
          'Land',
          'International',
          'Senior Housing',
          'Shortlet'
        ],
        default: []
      },
      serviceAreas: {
        type: [String],
        default: []
      },
      languages: {
        type: [String],
        enum: [
          'English',
          'Spanish',
          'French',
          'Hausa',
          'Yoruba',
          'Igbo',
          'Russian',
        ],
        default: ['English']
      },
      
      // Performance Metrics
      teamSize: { 
        type: Number, 
        min: 1,
        default: 1
      },
      
      // Social Proof
      awards: { 
        type: [String],
        default: []
      }
    },

    // Subscription Data
    subscription: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Subscription",
      default: null
    },
    subscriptionExpiresAt: { 
      type: Date, 
      default: null
    },

    // Listing Limits
    freeListingsRemaining: { 
      type: Number, 
      min: 0,
      default: 5
    },
    lastFreeListingReset: { 
      type: Date, 
      default: null
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  }
);

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for years in business (calculated from createdAt)
UserSchema.virtual('yearsInBusiness').get(function() {
  if (!this.createdAt) return 1;
  const diffYears = new Date().getFullYear() - this.createdAt.getFullYear();
  return Math.max(diffYears, 1); // Minimum 1 year
});

// Indexes for better query performance
UserSchema.index({ role: 1 });
UserSchema.index({ 'agentDetails.specialties': 1 });
UserSchema.index({ 'agentDetails.serviceAreas': 1 });

const User = mongoose.model("User", UserSchema);
export default User;