import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
    {
      property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: false },
      client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true },
      reply: {
        type: String,
        default: "",
      },
      
      status: { type: String, enum: ["pending", "replied"], default: "pending" },
    },
    { timestamps: true }
  );
  
  const Inquiry = mongoose.model("Inquiry", InquirySchema);
  export default Inquiry;
  