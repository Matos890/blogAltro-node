const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //1) create transporter, service that sends the email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
  //2) define the email options
  const mailOptions = {
    from: "Mattia Yaghmai <matosyaghmai@gmail.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3) send the email with Nodemailer
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
