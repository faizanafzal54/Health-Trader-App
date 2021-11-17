const { sendResponse } = require("../utils/utils");
const reminderDao = require("../daos/reminderDao");

module.exports = {
  createReminder: async (req, res) => {
    try {
      const {
        userId,
        reminderType,
        startDateTime,
        isRepeating,
        reminderFrequency,
        dayOfWeek,
        repeatEvery,
        duration,
        terminationDate,
        name,
        location,
        comments,
      } = req.body;
      const reminder = await reminderDao.create({
        userId,
        reminderType,
        startDateTime,
        isRepeating,
        reminderFrequency,
        dayOfWeek,
        repeatEvery,
        duration,
        terminationDate,
        name,
        location,
        comments,
        isActive: true,
      });
      sendResponse(null, req, res, { reminder });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getRemindersOfUser: async (req, res) => {
    try {
      const { userId } = req.query;
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
