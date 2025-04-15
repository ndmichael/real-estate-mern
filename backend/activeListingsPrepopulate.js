import mongoose from 'mongoose';
import User from './src/models/User.js';
import Property from './src/models/Property.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const backfillActiveListings = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const agents = await User.find({ role: 'agent' });

    for (let agent of agents) {
      const properties = await Property.find({
        agent: agent._id,
        //status: 'active', // adjust based on your schema (e.g., published: true, etc.)
      });

      const activeListingIds = properties.map((prop) => prop._id);
      agent.activeListings = activeListingIds;

      await agent.save();

      console.log(
        `Updated agent ${agent.firstName} ${agent.lastName} with ${activeListingIds.length} active listings`
      );
    }

    console.log('Backfill complete ✅');
    process.exit();
  } catch (err) {
    console.error('Error backfilling active listings:', err.message);
    process.exit(1);
  }
};

backfillActiveListings();
