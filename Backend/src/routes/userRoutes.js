import express from "express";
import userController from "../controller/userController.js";

import { upload } from "../utils/multer.js";

export const userRouter = express.Router();

const uController = new userController();
userRouter.post("/verifyPassword", (req, res) =>
  uController.validatePassword(req, res)
);

// Bind the class methods to preserve the `this` context
userRouter.post("/save", (req, res) => uController.saveUser(req, res));
userRouter.get("/get/all", (req, res) => uController.getAll(req, res));
userRouter.get("/get/:username", (req, res) => uController.getOne(req, res));
userRouter.put("/update/:username", (req, res) =>
  uController.updateUser(req, res)
);
userRouter.patch("/patch/:username", (req, res) =>
  uController.patchUser(req, res)
);
userRouter.delete("/delete/:username", (req, res) =>
  uController.deleteUser(req, res)
);

//! Profile
userRouter.patch(
  "/profilePatch/:username",
  upload.single("profilePic"),
  (req, res) => uController.ProfilePatch(req, res)
);

userRouter.get("/get/profile/:username", (req, res) =>
  uController.getProfile(req, res)
);

userRouter.delete("/delete/profile/:username", (req, res) =>
  uController.deleteProfile(req, res)
);
