const reminderMetaDao = require("../daos/reminderMetaDao");
const transporter = require("./transporter");
const { formatAMPM } = require("./utils");
const appUrl = "http://18.116.180.161:5000";

const triggerEmailReminder = async () => {
  try {
    let tempgt = new Date();
    const gtDate = tempgt.setDate(tempgt.getDate()); // Start Date
    let templt = new Date();
    const ltDate = templt.setTime(templt.getTime() + 30 * 60 * 1000);
    const reminders = await reminderMetaDao.findByTimeForCron(gtDate, ltDate);
    console.log(reminders.length);
    for (let reminder of reminders) {
      if (reminder.userId?.email) {
        emailTransport(
          reminder.userId?.email,
          reminder.date,
          reminder.userId?.timeZone || "America/New_York"
        );
      }
      for (let to of reminder.reminderTo) {
        if (to.email) {
          emailTransport(
            to.email,
            reminder.date,
            reminder.userId?.timeZone || "America/New_York"
          );
        }
      }
    }
  } catch (err) {
    console.log("Cron job Error:", err);
  }
};

const emailTransport = (_email, _date, timeZone) => {
  console.log(_email);
  const mailOptions = {
    from: "",
    to: `${_email}`,
    subject: "Reminder-- Health Trader App",
    html: `<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
                  <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>Custom Code From Scratch</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                     
                  </head>
                  <body style="margin:0; padding:10px; background-color: #F0F0F0;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="640" style="border-collapse: collapse;" bgcolor="#ffffff" >
                        <tr style="">
                          <td style="padding:40px">
                            
                            </td>
                        </tr>
                        <tr>
                          <td style="padding-left:40px; padding-right:40px; padding-top:0px;">
                            <p style="display:block; margin:0;   font-family:field-work-light; font-weight: normal; font-size:21px; line-height: 35px;">
                              Hello, <br/>
                              You have a reminder at ${new Date(
                                _date
                              ).toLocaleString("en-US", {
                                timeZone: timeZone,
                              })}. Go to <a href="${appUrl}">App</a>.
                          </td>
                        </tr>
                        <tr style="display:block; border-top:2px solid green;">
                          <td style="padding-left:40px;padding-right:40px; padding-bottom:40px;">
                            <p style="display:block; margin:0; color:#808080; padding-top:10px;  padding-right:20px; font-family:field-work-thin; font-weight: normal; font-size:12px; line-height: 24px;">Copyright &#xa9; ${new Date().getFullYear()} , All rights reserved.</p>
                          </td>
                        </tr>
                      </table>
                  </body>
                </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email Reminder Cron Error:", error);
    } else {
      console.log("Reminder Email sent: " + info.response);
    }
  });
};

module.exports = { triggerEmailReminder };
