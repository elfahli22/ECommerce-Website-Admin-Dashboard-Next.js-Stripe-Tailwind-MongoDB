import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  name: { type: String, default: "" },
  wishlist: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;