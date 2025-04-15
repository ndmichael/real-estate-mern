import Property from "./src/models/Property.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config(); // Load MONGO_URI

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

const mockProperties = [
    // Agent 1 (ID: 67f7ef968d2cb0fdc75398bb) - 6 listings
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bb'),
      title: "Luxury 5-Bedroom Villa in Banana Island",
      description: "Exquisite waterfront villa with private pool, gym and smart home features",
      category: "buy",
      price: 650000000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "12 Banana Island Drive, Ikoyi",
        longitude: 3.4215,
        latitude: 6.4523
      },
      bedrooms: 5,
      bathrooms: 6,
      toilets: 6,
      images: [
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      isAvailable: true,
      isFeatured: true,
      featuredExpiresAt: new Date('2025-12-31')
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bb'),
      title: "Modern 3-Bed Apartment in Lekki Phase 1",
      description: "Fully furnished apartment with concierge service and gym access",
      category: "rent",
      price: 4500000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "24 Admiralty Way, Lekki Phase 1",
        longitude: 3.4732,
        latitude: 6.4391
      },
      bedrooms: 3,
      bathrooms: 3,
      toilets: 3,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bb'),
      title: "Executive Shortlet Apartment in Victoria Island",
      description: "Daily rentals available in this luxury apartment with sea views",
      category: "shortlet",
      price: 120000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "8A Ahmadu Bello Way, VI",
        longitude: 3.4217,
        latitude: 6.4284
      },
      bedrooms: 2,
      bathrooms: 2,
      toilets: 2,
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-97abe7378152",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
      ],
      isAvailable: true,
      isFeatured: true,
      featuredExpiresAt: new Date('2025-06-30')
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bb'),
      title: "4-Bedroom Terrace Duplex in Ikoyi",
      description: "Newly built duplex with BQ and ample parking space",
      category: "buy",
      price: 320000000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "14 Bourdillon Road, Ikoyi",
        longitude: 3.4356,
        latitude: 6.4532
      },
      bedrooms: 4,
      bathrooms: 5,
      toilets: 5,
      images: [
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bb'),
      title: "2-Bedroom Flat in GRA Ikeja",
      description: "Spacious flat in quiet neighborhood with 24/7 security",
      category: "rent",
      price: 2800000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "32 Oduduwa Way, GRA Ikeja",
        longitude: 3.3487,
        latitude: 6.6012
      },
      bedrooms: 2,
      bathrooms: 2,
      toilets: 2,
      images: [
        "https://images.unsplash.com/photo-1605146768851-eda79da39897",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bb'),
      title: "Luxury Penthouse in Lekki (Weekly Rentals)",
      description: "Stunning penthouse with panoramic views of the lagoon",
      category: "shortlet",
      price: 350000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "5A Maroko Drive, Lekki",
        longitude: 3.4815,
        latitude: 6.4478
      },
      bedrooms: 3,
      bathrooms: 3,
      toilets: 3,
      images: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: true,
      featuredExpiresAt: new Date('2025-09-30')
    },
  
    // Agent 2 (ID: 67f7ef968d2cb0fdc75398be) - 6 listings
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398be'),
      title: "6-Bedroom Mansion in Asokoro",
      description: "State-of-the-art mansion with tennis court and underground parking",
      category: "buy",
      price: 850000000,
      location: {
        city: "Abuja",
        state: "FCT",
        address: "1 Diplomatic Drive, Asokoro",
        longitude: 7.5190,
        latitude: 9.0512
      },
      bedrooms: 6,
      bathrooms: 7,
      toilets: 7,
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      isAvailable: true,
      isFeatured: true,
      featuredExpiresAt: new Date('2025-11-30')
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398be'),
      title: "3-Bedroom Terrace in Wuse 2",
      description: "Elegant terrace house with maid's quarters and garden",
      category: "rent",
      price: 5500000,
      location: {
        city: "Abuja",
        state: "FCT",
        address: "12 Lake Street, Wuse 2",
        longitude: 7.4862,
        latitude: 9.0726
      },
      bedrooms: 3,
      bathrooms: 3,
      toilets: 3,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398be'),
      title: "Executive Suite in Maitama",
      description: "Fully serviced luxury suite with daily housekeeping",
      category: "shortlet",
      price: 180000,
      location: {
        city: "Abuja",
        state: "FCT",
        address: "8A IBB Boulevard, Maitama",
        longitude: 7.5023,
        latitude: 9.0834
      },
      bedrooms: 1,
      bathrooms: 1,
      toilets: 1,
      images: [
        "https://images.unsplash.com/photo-1605146768851-eda79da39897",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398be'),
      title: "Commercial Plaza in Central Business District",
      description: "6-floor commercial building with 100% occupancy rate",
      category: "buy",
      price: 1200000000,
      location: {
        city: "Abuja",
        state: "FCT",
        address: "23 Constitution Avenue, CBD",
        longitude: 7.4897,
        latitude: 9.0579
      },
      bedrooms: 0,
      bathrooms: 12,
      toilets: 12,
      images: [
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: true,
      featuredExpiresAt: new Date('2025-10-31')
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398be'),
      title: "2-Bedroom Flat in Gwarinpa",
      description: "Affordable flat in family-friendly estate",
      category: "rent",
      price: 1800000,
      location: {
        city: "Abuja",
        state: "FCT",
        address: "112 3rd Avenue, Gwarinpa",
        longitude: 7.4105,
        latitude: 9.1123
      },
      bedrooms: 2,
      bathrooms: 2,
      toilets: 2,
      images: [
        "https://images.unsplash.com/photo-1605146768851-eda79da39897",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398be'),
      title: "Luxury Apartment in Jabi",
      description: "Modern apartment with gym and pool access (minimum 3 nights)",
      category: "shortlet",
      price: 95000,
      location: {
        city: "Abuja",
        state: "FCT",
        address: "15 Jabi Lake Mall Road",
        longitude: 7.4321,
        latitude: 9.0728
      },
      bedrooms: 2,
      bathrooms: 2,
      toilets: 2,
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: false
    },
  
    // Agent 3 (ID: 67f7ef968d2cb0fdc75398bf) - 6 listings
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bf'),
      title: "Beachfront Estate in Epe",
      description: "5-acre estate with private beach and guest houses",
      category: "buy",
      price: 1500000000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "Km 25 Lekki-Epe Expressway",
        longitude: 3.6728,
        latitude: 6.4939
      },
      bedrooms: 8,
      bathrooms: 10,
      toilets: 10,
      images: [
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: true,
      featuredExpiresAt: new Date('2026-01-31')
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bf'),
      title: "4-Bedroom Duplex in Ajah",
      description: "Newly built duplex with BQ and ample parking space",
      category: "rent",
      price: 6500000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "14 Freedom Way, Ajah",
        longitude: 3.5721,
        latitude: 6.4512
      },
      bedrooms: 4,
      bathrooms: 4,
      toilets: 4,
      images: [
        "https://images.unsplash.com/photo-1605146768851-eda79da39897",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bf'),
      title: "Waterfront Cottage in Badagry",
      description: "Romantic getaway with private beach access",
      category: "shortlet",
      price: 85000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "7 Coconut Beach Road, Badagry",
        longitude: 2.8815,
        latitude: 6.4152
      },
      bedrooms: 1,
      bathrooms: 1,
      toilets: 1,
      images: [
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bf'),
      title: "Luxury Penthouses in Victoria Island (2 Units)",
      description: "Two premium penthouses with panoramic ocean views",
      category: "buy",
      price: 950000000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "22A Adeola Odeku Street, VI",
        longitude: 3.4258,
        latitude: 6.4281
      },
      bedrooms: 5,
      bathrooms: 5,
      toilets: 5,
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: true,
      featuredExpiresAt: new Date('2025-08-31')
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bf'),
      title: "3-Bedroom Terrace in Surulere",
      description: "Classic Lagos terrace house with large compound",
      category: "rent",
      price: 3800000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "17 Bode Thomas Street, Surulere",
        longitude: 3.3562,
        latitude: 6.5015
      },
      bedrooms: 3,
      bathrooms: 3,
      toilets: 3,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      isAvailable: true,
      isFeatured: false
    },
    {
      agent: new mongoose.Types.ObjectId('67f7ef968d2cb0fdc75398bf'),
      title: "Designer Loft in Yaba",
      description: "Trendy industrial-style loft perfect for creative professionals",
      category: "shortlet",
      price: 75000,
      location: {
        city: "Lagos",
        state: "Lagos",
        address: "14 Herbert Macaulay Way, Yaba",
        longitude: 3.3798,
        latitude: 6.4969
      },
      bedrooms: 1,
      bathrooms: 1,
      toilets: 1,
      images: [
        "https://images.unsplash.com/photo-1605146768851-eda79da39897",
        "https://images.unsplash.com/photo-1603192649912-22c5b1c174fe",
        "https://images.unsplash.com/photo-1560448205-17d3a46c84de",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
      ],
      isAvailable: true,
      isFeatured: false
    }
  ];

await Property.deleteMany({});
await Property.insertMany([...mockProperties]);

console.log("🌱 Seeding complete!");
process.exit(0);