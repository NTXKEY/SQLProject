import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import mailer from "../config/mailer.js";

import { JWT_EMAIL_KEY } from "../config/env.js";

// import { genAccessToken, genRefreshToken } from "../utils/jwtUtil.js";
import { auth } from "../models/userAuthSchema.js";

export default class authController {
  async getOne(req, res) {
    const { email } = req.body;
    try {
      const result = await auth.findOne({ email });
      if (result === null) {
        return res.status(200).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User Found", result });
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      transaction.startTransaction();

      const { username, email, password } = req.body;
      const doesEmailExist = await auth.findOne({ email });
      if (doesEmailExist) {
        return res.status(400).json({ message: "User already exists" });
      }

      const doesUsernameExist = await auth.findOne({ username });
      if (doesUsernameExist) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const USER = new auth({
        username,
        email,
        password: hashedPassword,
      });
      const userStatus = await USER.save();

      const token = jwt.sign({ email }, JWT_EMAIL_KEY, { expiresIn: "10m" });

      const verificationLink = `http://localhost:5000/api/auth/verify/${token}`;

      const mailService = new mailer();

      await mailService.sendVerifyMail({
        to: email,
        subject: "Email verification",
        name: username,
        link: verificationLink,
        // html: VerifyEmail.getVerify(),
      });

      // const accessToken = genAccessToken(USER._id);
      // const refreshToken = genRefreshToken(USER._id);

      res.status(200).json({
        message: "User registered successfully",
        userStatus: userStatus,
      });

      await transaction.commitTransaction();
      await mailService.sendWelcomeMail({
        to: email,
        subject: "Welcome to our platform",
        name: username,
      });
    } catch (error) {
      await transaction.abortTransaction();
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const { email, password } = req.body;
      transaction.startTransaction();

      const result = await auth.findOne({ email });

      if (!result) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, result.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // const accessToken = generateAccessToken(user._id);
      // const refreshToken = generateRefreshToken(user._id);
      res.status(200).json(
        { message: "Login successful", result }
        // accessToken,
        // refreshToken
      );
      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.log(error);
    }
  }

  async resetPasswordEmail(req, res) {
    const { email } = req.body;
    try {
      const user = await auth.findOne({ email });
      user.isPasswordReset = false;
      await user.save();

      const token = jwt.sign({ email }, JWT_EMAIL_KEY, {
        expiresIn: "10m",
      });

      const verificationLink = `http://localhost:5000/api/auth/resetPassword/verify/${token}`;

      const mailService = new mailer();

      await mailService.sendResetMail({
        to: email,
        subject: "Email verification",
        name: user.username,
        link: verificationLink,
      });

      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      return res.status(400).json({ message: "Error sending email" });
    }
  }

  async verifyEmail(req, res) {
    const { token } = req.params;
    try {
      const decoded = jwt.verify(token, JWT_EMAIL_KEY);
      const { email } = decoded;

      const user = await auth.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      user.isVerified = true;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  }
  async passwordVerifyEmail(req, res) {
    const { token } = req.params;
    try {
      const decoded = jwt.verify(token, JWT_EMAIL_KEY);
      const { email } = decoded;
      const user = await auth.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.isPasswordReset) {
        user.isPasswordReset = true;
        await user.save();
        return res.send("<p>Email verified successfully</p>");
        // return res.status(200).json({ message: "Email verified successfully" });
      }

      return res.status(400).json({ message: "Error verifying email" });
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  }

  async updatePassword(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const { username } = req.params;
      const { password } = req.body;
      const query = await auth.findOne({ username });

      if (!query) {
        return res.status(400).json({ message: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      transaction.startTransaction();
      const updatePass = await auth.findOneAndUpdate(
        { username },
        { $set: { password: hashedPassword } },
        { new: true }
      );

      if (!updatePass) {
        return res.status(400).json({ message: "DB Error" });
      }
      transaction.commitTransaction();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
    }
  }

  // async refreshTokens(req, res) {
  //   try {
  //     const refreshTokens = req.cookies.refreshToken;
  //     const decode = jwt.verify(refreshTokens, JWT_REFRESH_KEY);
  //     const newAccessToken = genRefreshToken(decode.id);

  //     if (!refreshTokens) {
  //       return res.status(401).json({ message: "No refresh tokens found" });
  //     }

  //     res
  //       .cookie("accessToken", newAccessToken, {
  //         httpOnly: true,
  //         secure: true,
  //         sameSite: "strict",
  //         maxAge: 7 * 24 * 60 * 60 * 1000,
  //       })
  //       .cookie("refreshToken", refreshTokens, {
  //         httpOnly: true,
  //         secure: true,
  //         sameSite: "strict",
  //         maxAge: 15 * 60 * 1000,
  //       })
  //       .status(200)
  //       .json({ message: "Token refreshed successfully", newAccessToken });
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     res.status(401).json({ message: "Error refreshing token" });
  //   }
  // }
}
