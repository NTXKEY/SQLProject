import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  profilePic: { type: String, default: null },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  DOB: { type: String, required: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String },
  gender: { type: String },
  occupation: { type: String },
  medicalConditions: [String],
  createdAt: { type: Date, default: Date.now },
});
export const user = mongoose.model("user", userSchema);
