import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

export const genRefreshToken = (uId) => {
  return jwt.sign({ id: uId }, SECRET_KEY, { expiresIn: "7d" });
};

export const genAccessToken = (uId) => {
  return jwt.sign({ id: uId }, SECRET_KEY, { expiresIn: "10m" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error(error);
  }
};
