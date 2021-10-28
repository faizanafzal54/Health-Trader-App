const Reminder = require("../models/ReminderModel");

module.exports = {
  create: async (obj) => {
    try {
      let newReminder = new Reminder(obj);
      const response = await newReminder.save();
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
  find: async (userId) => {
    try {
      console.time("find");
      const reminders = await Reminder.find({ userId })
        .populate("userId")
        .populate("reminderTo")
        .lean();
      console.timeEnd("find");
      return reminders;
    } catch (err) {
      throw new Error(err);
    }
  },
  findOneAndUpdate: async (where, set) => {
    try {
      const reminder = await Reminder.findOneAndUpdate(where, set, {
        new: true,
      });
      return reminder;
    } catch (err) {
      throw new Error(err);
    }
  },
};
