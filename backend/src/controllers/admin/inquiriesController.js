import Inquiry from "../models/inquiryModel.js";

export const getAllInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().populate("property").populate("user");
  res.json(inquiries);
};

export const updateInquiryStatus = async (req, res) => {
  const { status } = req.body;
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

  inquiry.status = status;
  await inquiry.save();

  res.json({ message: "Inquiry status updated" });
};