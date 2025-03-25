import Subscription from "../models/Subscription.js";

export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate("agent");
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions", error });
  }
};
