// ! This is a test project to test.

import express from "express";
import cors from "cors";

import { BACK_END_URL, FRONT_END_URL, PORT } from "./config/env.js";

import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { doctorRouter } from "./routes/doctorRoutes.js";
import { mailRouter } from "./routes/mailRoutes.js";

const app = express();

app.use(express.json());
const corsOptions = {
  origin: FRONT_END_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/mail", mailRouter);

connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
