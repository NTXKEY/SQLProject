import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { EMAIL, PASSWORD } from "./env.js";
import ResetTemplate from "./Templates/Reset.js";
import WelcomeTemplate from "./Templates/Welcome.js";
import VerifyTemplate from "./Templates/Verify.js";

dotenv.config();

export default class mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
  }

  async sendWelcomeMail({ from, to, subject, name }) {
    const template = new WelcomeTemplate(name);
    try {
      const mailOptions = {
        from,
        to,
        subject,
        html: template.getWelcome(),
      };
      const info = await this.transporter.sendMail(mailOptions);
      // console.log("Email sent:", info.response);
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: "Error sending email", error };
    }
  }
  async sendResetMail({ from, to, subject, name, link }) {
    const template = new ResetTemplate(name, link);
    try {
      const mailOptions = {
        from,
        to,
        subject,
        html: template.getReset(),
      };
      const info = await this.transporter.sendMail(mailOptions);
      // console.log("Email sent:", info.response);
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: "Error sending email", error };
    }
  }
  async sendVerifyMail({ from, to, subject, name, link }) {
    const template = new VerifyTemplate(name, link);
    try {
      const mailOptions = {
        from,
        to,
        subject,
        html: template.getVerify(),
      };
      const info = await this.transporter.sendMail(mailOptions);
      // console.log("Email sent:", info.response);
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: "Error sending email", error };
    }
  }
}
