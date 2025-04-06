import { mongoose } from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  DOB: { type: Date, required: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String },
  gender: { type: String },
  specialization: { type: String, default: null },
  tags: [String],
  experience: { type: Number, default: null },
  prize: { type: Number, default: null },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const doctor = mongoose.model("Doctor", doctorSchema);
