const { sendResponse } = require("../utils/utils");
const reminderDao = require("../daos/reminderDao");

module.exports = {
  getRemindersOfUser: async (req, res) => {
    try {
      const { userId } = req.query;
      //   const newReminder = await reminderDao.create({
      //     userId: "614f3aae7b77b9a0e6441ced",
      //     reminderType: "Medication",
      //     subject: "",
      //     howMuch: "",
      //     link: "",
      //     details: "",
      //     predefinedTime: new Date(),
      //     medicationStartDate: new Date("2021/09/12"),
      //     medicationEndDate: new Date("2021/11/12"),
      //     notificationType: {
      //       mobile: false,
      //       email: false,
      //     },
      //     status: "",
      //     isActive: true,
      //     reminderTo: ["6156ff01b99e6f9f6f99b9d7"],
      //   });
      const reminders = await reminderDao.find(userId);
      sendResponse(null, req, res, { reminders });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  setReminderStatus: async (req, res) => {
    try {
      const { reminderId, status } = req.body;
      const updatedReminder = await reminderDao.findOneAndUpdate(
        { _id: reminderId },
        { $set: { status } }
      );
      sendResponse(null, req, res, { reminder: updatedReminder });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
