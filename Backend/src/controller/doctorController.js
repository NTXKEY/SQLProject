import mongoose from "mongoose";

import { doctor } from "../models/doctorSchema.js";
import { EMAIL } from "../config/env.js";

export default class doctorController {
  // async doesExists(identifier) {
  //   try {
  //     const result = await doctor.findOne({ identifier });
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async saveDoctor(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const exists = await doctor.findOne({
        email: req.body.email,
      });
      if (exists) {
        return res.status(400).json({ message: "Doctor already exists" });
      }
      const { name, email, age, DOB, contactNumber, address, tags } = req.body;

      transaction.startTransaction();
      const DOCTOR = new doctor({
        name,
        email,
        age,
        DOB,
        contactNumber,
        address,
        tags,
      });

      await DOCTOR.save();
      await transaction.commitTransaction();
      return res
        .status(200)
        .json({ message: "Doctor saved successfully", DOCTOR });
    } catch (error) {
      await transaction.abortTransaction();
      return error;
    }
  }

  async getOne(req, res) {
    try {
      const { name } = req.params;
      const doctorData = await doctor.findOne({ name: name });
      if (!doctor) {
        return res.status(404).json({ message: "doctor not found" });
      }
      res.status(200).json(doctorData);
    } catch (error) {
      console.error("Error fetching doctor:", error);
      res.status(500).json({ message: "Error fetching doctor" });
    }
  }

  async getAll(req, res) {
    try {
      const doctors = await doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ message: "Error fetching doctors" });
    }
  }

  async updateDoctor(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      transaction.startTransaction();
      const { name } = req.params;
      const updatedData = req.body;

      // Find the doctor by name and replace the entire document
      const updatedDoctor = await doctor.findOneAndReplace(
        { name },
        updatedData,
        {
          new: true,
        }
      );

      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res
        .status(200)
        .json({ message: "doctor updated successfully", updatedDoctor });
      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.error("Error updating doctor:", error);
      res.status(500).json({ message: "Error updating doctor" });
    }
  }

  async patchDoctor(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      const { name } = req.params;
      const updatedFields = req.body;

      transaction.startTransaction();
      const updatedDoctor = await doctor.findOneAndUpdate(
        { name },
        { $set: updatedFields },
        { new: true }
      );

      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.status(200).json({
        message: "doctor updated successfully",
        updatedDoctor: updatedDoctor,
      });

      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.error("Error updating doctor:", error);
      res.status(500).json({ message: "Error updating doctor" });
    }
  }
  async deleteDoctor(req, res) {
    const transaction = await mongoose.connection.startSession();
    try {
      transaction.startTransaction();
      const { name } = req.params;
      const deletedDoctor = await doctor.findOneAndDelete({ name: name });
      if (!deletedDoctor) {
        return res.status(404).json({ message: "doctor not found" });
      }
      res.status(200).json({ message: "doctor deleted successfully" });
      await transaction.commitTransaction();
    } catch (error) {
      await transaction.abortTransaction();
      console.error("Error deleting doctor:", error);
    }
  }
}
