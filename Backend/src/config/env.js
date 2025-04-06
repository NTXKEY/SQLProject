import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT must be defined");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}
if (!process.env.EMAIL) {
  throw new Error("EMAIL must be defined");
}
if (!process.env.PASSWORD) {
  throw new Error("PASSWORD must be defined");
}
if (!process.env.SECRETE_KEY) {
  throw new Error("SECRETE_KEY must be defined");
}
if (!process.env.JWT_EMAIL_KEY) {
  throw new error("JWT_EMAIL_KEY must be defined");
}
if (!process.env.FRONT_END_URL) {
  throw new error("FRONT_END_URL must be defined");
}
if (!process.env.BACK_END_URL) {
  throw new error("BACK_END_URL must be defined");
}

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const EMAIL = process.env.EMAIL;
export const PASSWORD = process.env.PASSWORD;
export const SECRET_KEY = process.env.SECRETE_KEY;
export const JWT_EMAIL_KEY = process.env.JWT_EMAIL_KEY;
export const FRONT_END_URL = process.env.FRONT_END_URL;
export const BACK_END_URL = process.env.BACK_END_URL;
