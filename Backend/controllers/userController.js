
import pool from '../utils/db.js';

export const getAllUsers = async (req, res) => {
  console.log("Triggered")
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE username = ?', [username]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
