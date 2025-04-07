
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

export const sendMail = async (to, subject, body) => {
  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to,
    subject,
    text: body
  });
};
