// controllers/inquiryController.js
import Inquiry from "../../models/Inquiry.js";

// Create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { propertyId, clientId, agentId, message } = req.body;

    const newInquiry = new Inquiry({
      property: propertyId,
      client: clientId,
      agent: agentId,
      message,
      status: "pending",
    });

    await newInquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully", inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ message: "Failed to create inquiry", error });
  }
};


// controllers/inquiryController.js
export const getClientInquiries = async (req, res) => {
    try {
      const clientId = req.params.clientId;
  
      // Fetch inquiries and populate client, agent, and property details
      const inquiries = await Inquiry.find({ client: clientId })
        .populate("property") 
        .populate("user");
  
      if (inquiries.length === 0) {
        return res.status(404).json({ message: "No inquiries found" });
      }
  
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get inquiries", error });
    }
  };
  
  export const getAgentInquiries = async (req, res) => {
    try {
      const agentId = req.params.agentId;
  
      // Fetch inquiries and populate client, agent, and property details
      const inquiries = await Inquiry.find({ agent: agentId })
        .populate("property") // populate the property details
        .populate("agent") // populate the agent details
        .populate("client"); // populate the client details
  
      if (inquiries.length === 0) {
        return res.status(404).json({ message: "No inquiries found" });
      }
      console.log("inquiries: ", inquiries)
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get inquiries", error });
    }
  };
  

// Update inquiry status (e.g., from 'pending' to 'replied')
export const updateInquiryStatus = async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const { status } = req.body;

    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

    inquiry.status = status; // update status
    await inquiry.save();

    res.json({ message: "Inquiry status updated", inquiry });
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry status", error });
  }
};
