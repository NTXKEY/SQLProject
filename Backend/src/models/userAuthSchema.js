import { mongoose } from "mongoose";
const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  isVerified: {
    type: "boolean",
    default: false,
  },
  isPasswordReset: {
    type: "boolean",
    default: false,
  },
  type: {
    type: "string",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const auth = mongoose.model("Auth", authSchema);
