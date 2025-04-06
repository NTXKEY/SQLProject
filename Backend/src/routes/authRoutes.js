import express from "express";
import authController from "../controller/authController.js";

export const authRouter = express.Router();
const Controller = new authController();

authRouter.get("/verify/:token", Controller.verifyEmail);

authRouter.get("/resetPassword/verify/:token", Controller.passwordVerifyEmail);
authRouter.post("/passwordReset/verify", Controller.resetPasswordEmail);

authRouter.post("/register", Controller.register);
authRouter.post("/login", Controller.login);
authRouter.post("/getOne", Controller.getOne);

authRouter.patch("/updatePassword/:username", Controller.updatePassword);

// authRouter.post("/refresh", Controller.refreshTokens);
