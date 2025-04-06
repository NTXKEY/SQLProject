import express from "express";
import mailer from "../config/mailer.js";

export const mailRouter = express.Router();
const mailService = new mailer();

mailRouter.post("/sendMail/welcome", async (req, res) => {
  const { from, to, subject, name } = req.body;
  if (!from || !to || !subject) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  const response = await mailService.sendWelcomeMail({
    from,
    to,
    subject,
    name,
  });
  if (response.success) {
    res.json(response);
  } else {
    res.status(500).json(response);
    res.json({ success: false, message: "Error sending email" });
  }
});

mailRouter.post("/sendMail/reset", async (req, res) => {
  const { from, to, subject, name, link } = req.body;
  if (!from || !to || !subject || !name || !link) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  const response = await mailService.sendResetMail({
    from,
    to,
    subject,
    name,
    link,
  });
  if (response.success) {
    res.json(response);
  } else {
    res.status(500).json(response);
    res.json({ success: false, message: "Error sending email" });
  }
});
mailRouter.post("/sendMail/verify", async (req, res) => {
  const { from, to, subject, name, link } = req.body;
  if (!from || !to || !subject || !name || !link) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  const response = await mailService.sendVerifyMail({
    from,
    to,
    subject,
    name,
    link,
  });
  if (response.success) {
    res.json(response);
  } else {
    res.status(500).json(response);
    res.json({ success: false, message: "Error sending email" });
  }
});
