import express from "express";
import doctorController from "../controller/doctorController.js";

export const doctorRouter = express.Router();
const dController = new doctorController();

// Bind the class methods to preserve the `this` context
doctorRouter.post("/save", (req, res) => dController.saveDoctor(req, res));
doctorRouter.get("/get/all", (req, res) => dController.getAll(req, res));
doctorRouter.get("/get/:name", (req, res) => dController.getOne(req, res));
doctorRouter.put("/update/:name", (req, res) =>
  dController.updateDoctor(req, res)
);
doctorRouter.patch("/patch/:name", (req, res) =>
  dController.patchDoctor(req, res)
);
doctorRouter.delete("/delete/:name", (req, res) =>
  dController.deleteDoctor(req, res)
);
