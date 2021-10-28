let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  auth: {
    user: "cranehawk54@gmail.com",
    pass: "Chawk7862924",
  },
});

module.exports = transporter;
