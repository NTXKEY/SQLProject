import express from 'express';
import {
  getAllDoctors,
  addDoctor,
  getDoctorByUsername,
  deleteDoctorByUsername
} from '../controllers/doctorController.js'; // ✅ Make sure this path is correct

const router = express.Router();

router.get('/', getAllDoctors);
router.post('/', addDoctor);
router.get('/:username', getDoctorByUsername);
router.delete('/:username', deleteDoctorByUsername);

export default router;
