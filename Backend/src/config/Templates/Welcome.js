export default class WelcomeTemplate {
  constructor(name) {
    this.name = name;
  }

  getWelcome() {
    return `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Project Cure</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="color: #007bff;">Welcome to Project Cure</h1>
        </div>
        <div style="padding: 20px; font-size: 16px; color: #333; text-align: center;">
            <p>Dear ${this.name},</p>
            <p>We’re thrilled to have you join Project Cure! Our mission is to provide exceptional healthcare solutions, and your participation is key to making a real difference.</p>
            <p>Get started by exploring your dashboard and setting up your profile.</p>
            <p>Thank you for being a part of our journey.</p>
        </div>
        <div style="text-align: center; padding: 15px; font-size: 14px; color: #777;">
            <p>If you have any questions, feel free to reach out.<br>Project Cure Team</p>
        </div>
    </div>
</body>
</html>
`;
  }
}
