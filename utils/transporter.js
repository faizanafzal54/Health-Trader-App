let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "smtp.office365.com",
  port: 587,
  auth: {
    user: "",
    pass: ``,
  },
});

module.exports = transporter;
