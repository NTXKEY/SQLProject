
import pool from '../utils/db.js';
import bcrypt from 'bcrypt';

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

export const patchUserDetailsByUsername = async (req, res) => {
  const { username } = req.params;
  console.log(username,req.body)
  const allowedFields = ["name", "contactNumber", "gender", "address", "occupation", "medicalConditions", "DOB"];
  const {name, contactNumber, gender, address, occupation, medicalConditions, DOB} = req.body;
  const updates = {name, contactNumber, gender, address, occupation, medicalConditions, DOB};

  try {
    const fields = [];
    const values = [];

    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No valid fields provided to update' });
    }

    values.push(username);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE username = ?`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User details updated successfully' });
  } catch (err) {
    console.error('Error updating user details:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const patchUserByUsername = async (req, res) => {
  const { username } = req.params;
  const { email, password } = req.body;

  try {
    const fields = [];
    const values = [];

    if (email) {
      fields.push('email = ?');
      values.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      fields.push('password = ?');
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }

    values.push(username); 

    const query = `UPDATE users SET ${fields.join(', ')} WHERE username = ?`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
