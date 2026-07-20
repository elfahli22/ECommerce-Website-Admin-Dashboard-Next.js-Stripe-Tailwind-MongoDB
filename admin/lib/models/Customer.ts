import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  clerkId: { type: String, default: "" },
  name: String,
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order"}]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;