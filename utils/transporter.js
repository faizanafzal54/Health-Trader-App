let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "smtp.office365.com", // your smtp host
  port: 587,
  auth: {
    user: "", // smtp user
    pass: ``, // smtp password
  },
});

module.exports = transporter;
