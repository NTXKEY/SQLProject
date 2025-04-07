// routes/user.js
import express from 'express';
import {
  getAllUsers,
  getUserByUsername,
  addUser,
  deleteUserByUsername
} from '../controllers/userController.js';

const router = express.Router();

router.get('/get/all', getAllUsers);
router.get('/:username', getUserByUsername);
router.post('/add/user', addUser);
router.delete('/:username', deleteUserByUsername);

export default router;