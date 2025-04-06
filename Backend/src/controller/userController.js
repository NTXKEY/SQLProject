import mongoose from "mongoose";

import { user } from "../models/userSchema.js";
import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import { auth } from "../models/userAuthSchema.js";

export default class userController {
  async validatePassword(req, res) {
    const { username, enteredPassword } = req.body;

    try {
      const verifyPassword = await auth.findOne({ username: username });

      const isMatch = await bcrypt.compare(
        enteredPassword,
        verifyPassword.password
      );

      return res.status(200).json({ isMatch });
    } catch (error) {
      res.status(500).json({ message: "Error validating password" });
    }
  }

  async saveUser(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const exists = await user.findOne({ email: req.body.email });
      if (exists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const {
        name,
        username,
        email,
        contactNumber,
        age,
        DOB,
        gender,
        address,
        occupation,
        medicalConditions,
      } = req.body;

      transaction.startTransaction();

      const USER = new user({
        name,
        username,
        email,
        contactNumber,
        age,
        DOB,
        gender,
        address,
        occupation,
        medicalConditions,
      });
      await USER.save();
      res.status(200).json({ message: "User saved successfully", USER });

      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.log(error);
      return res.status(500).json({ message: "Error saving user" });
    }
  }

  async getOne(req, res) {
    try {
      const { username } = req.params;
      const userData = await user.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
      CD;
    }
  }

  async getAll(req, res) {
    try {
      const users = await user.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  async updateUser(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      transaction.startTransaction();
      const { name } = req.params;
      const updatedData = req.body;

      const updatedUser = await user.findOneAndReplace({ name }, updatedData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async patchUser(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const { username } = req.params;
      const updatedFields = req.body;

      if (res.file) {
        const UploadPath = `../uploads/${name}/${req.file.originalname}`;
        updatedFields.profilePic = UploadPath;
      }
      transaction.startTransaction();
      const updatedUser = await user.findOneAndUpdate(
        { username },
        { $set: updatedFields },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });

      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async deleteUser(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      transaction.startTransaction();
      const { username } = req.params;
      const deletedUser = await user.findOneAndDelete({ username: username });
      const deleteCredentials = await auth.findOneAndDelete({
        username: username,
      });

      if (!deletedUser || !deleteCredentials) {
        return res.status(404).json({ message: "User not found" });
      }
      if (deletedUser.profilePic != null) {
        const picPath = path.resolve(deletedUser.profilePic);
        if (fs.existsSync(picPath)) {
          fs.rmSync(picPath);
        }
      }

      res.status(200).json({ message: "User deleted successfully" });
      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.error("Error deleting user:", error);
    }
  }

  //! Profile

  async ProfilePatch(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      transaction.startTransaction();
      const { username } = req.params;
      const userData = req.body;
      const profilePicPath = path.join(
        "src",
        "uploads",
        username,
        "profile",
        req.file.originalname
      );
      if (req.file) {
        const User = await user.findOne({ username: username });
        if (User.profilePic != null) {
          const prevPic = path.resolve(User.profilePic);
          console.log("prevPic", prevPic);
          if (fs.existsSync(prevPic)) {
            fs.rmSync(prevPic);
          }

          // const updatedPic = await user.findOneAndUpdate(
          //   { name },
          //   { $set: { profilePic: profilePicPath } },
          //   { new: true }
          // );
          // if (!updatedPic) {
          //   return res.status(404).json({ message: "User not found" });
          // }
        }
        // if (User.profilePic === null) {
        userData.profilePic = profilePicPath;
        const updatedPic = await user.findOneAndUpdate(
          { username: username },
          { $set: { profilePic: profilePicPath } },
          { new: true }
        );
        if (!updatedPic) {
          return res.status(404).json({ message: "User not found" });
        }
        // }

        console.log("profilePicPath", profilePicPath);

        console.log("profilePicPath", userData.profilePic);

        res
          .status(200)
          .json({ message: "User updated successfully", updatedPic });
      }
      await transaction.commitTransaction();
    } catch (err) {
      await transaction.abortTransaction();
      console.log(err);
      res.status(500).json({ message: "Error updating profile" });
    }
  }

  async getProfile(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const { username } = req.params;
      transaction.startTransaction();
      const userData = await user.findOne({ username: username });
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
      if (userData.profilePic != null) {
        const picPath = path.resolve(userData.profilePic);
        console.log(picPath);
        if (!fs.existsSync(picPath)) {
          return res.status(404).json({ message: "Profile pic not found" });
        } else {
          const ext = path.extname(picPath).toLowerCase().substring(1);
          const contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;
          res.set("Content-Type", contentType);
          res.sendFile(picPath);
        }
      } else {
        // res.status(404).json({ message: "No profile Pic uploaded yet" });
        res.status(200).json({ profilePic: null });

        console.log("No profile Pic uploaded yet");
      }
      console.log("response", res.message);
      // if (userData.profilePic === "") {
      //   console.log("response", res.message);
      // }
      transaction.commitTransaction();
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
      await transaction.abortTransaction();
    }
  }
  async deleteProfile(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const { username } = req.params;

      transaction.startTransaction();
      const userData = await user.findOne({ username: username });

      if (!userData) {
        await transaction.abortTransaction();
        return res.status(404).json({ message: "User not found" });
      }
      if (userData.profilePic === null) {
        await transaction.abortTransaction();
        return res.status(403).json({
          message:
            "No profile Pic uploaded yet so please first upload one to delete",
        });
      }
      const picPath = path.resolve(userData.profilePic);
      if (!fs.existsSync(picPath)) {
        return res.status(404).json({ message: "Profile pic not found" });
      } else {
        fs.rmSync(picPath);
        await user.findOneAndUpdate(
          { username: username },
          { profilePic: null }
        );
        res.status(200).json({ message: "Profile pic deleted successfully" });
      }
      await transaction.commitTransaction();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
      await transaction.abortTransaction();
    }
  }
}
