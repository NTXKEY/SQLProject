// controllers/mailController.js
import { sendMail } from '../utils/mailer.js';

export const send = async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    await sendMail(to, subject, body);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email sending failed:', err);
    res.status(500).json({ error: err.message });
  }
};
