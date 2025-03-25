import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
    {
      property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
      client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true },
      status: { type: String, enum: ["pending", "replied"], default: "pending" },
    },
    { timestamps: true }
  );
  
  const Inquiry = mongoose.model("Subscription", InquirySchema);
  export default Inquiry;
  