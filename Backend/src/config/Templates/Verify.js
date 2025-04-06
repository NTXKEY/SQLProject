export default class VerifyTemplate {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
  getVerify() {
    // console.log(name, link);
    return `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="color: #007bff;">Verify Your Email</h1>
        </div>
        <div style="padding: 20px; font-size: 16px; color: #333; text-align: center;">
            <p>Dear ${this.name},</p>
            <p>Thank you for signing up with Project Cure. Please verify your email address by clicking the button below.</p>
            <a href=${this.link} style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>This link will expire in 10 minutes for security reasons.</p>
        </div>
        <div style="text-align: center; padding: 15px; font-size: 14px; color: #777;">
            <p>If you did not sign up, you can ignore this email.<br>Project Cure Team</p>
        </div>
    </div>
</body>
</html>
`;
  }
}
