// routes/user.js
import express from 'express';
import {
  getAllUsers,
  getUserByUsername,
  addUser,
  deleteUserByUsername,
  patchUserByUsername,
  patchUserDetailsByUsername
} from '../controllers/userController.js';

const router = express.Router();

router.get('/get/all', getAllUsers);
router.get('/get/:username', getUserByUsername);
router.post('/add/user', addUser);
router.delete('/add/:username', deleteUserByUsername);
router.patch('/patch/:username', patchUserByUsername);
router.patch('/patch/:username/details', patchUserDetailsByUsername);



export default router;