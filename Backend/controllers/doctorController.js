// controllers/doctorController.js
import db from '../utils/db.js';

export const getAllDoctors = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM doctors');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addDoctor = async (req, res) => {
  const { username, name, specialization } = req.body;

  try {
    await db.query(
      'INSERT INTO doctors (username, name, specialization) VALUES (?, ?, ?)',
      [username, name, specialization]
    );
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (err) {
    console.error('Error adding doctor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDoctorByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM doctors WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error retrieving doctor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteDoctorByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    await db.query(
      'DELETE FROM doctors WHERE username = ?',
      [username]
    );
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error('Error deleting doctor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
