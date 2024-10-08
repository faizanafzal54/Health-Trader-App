const ReminderMeta = require("../models/ReminderMetaModel");

module.exports = {
  insertMany: async (docs) => {
    try {
      const metas = await ReminderMeta.insertMany(docs);
      return metas;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  create: async (obj) => {
    try {
      let newReminder = new ReminderMeta(obj);
      const response = await newReminder.save();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  find: async (userId) => {
    try {
      console.time("find");
      const reminders = await ReminderMeta.find({ userId })
        .populate({
          path: "reminderId",
          populate: {
            path: "groupId",
          },
        })
        .populate("reminderTo")
        .lean();
      console.timeEnd("find");
      return reminders;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findByDateRange: async (userId, gtDate, ltDate) => {
    try {
      const reminders = await ReminderMeta.find({
        $or: [{ userId: userId }, { reminderTo: userId }],
        date: { $gte: gtDate, $lte: ltDate },

        isActive: true,
      })
        .populate({
          path: "reminderId",
          populate: {
            path: "groupId",
          },
        })
        .populate("reminderTo")
        .lean();
      return reminders;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  findOneAndUpdate: async (where, set) => {
    try {
      const reminder = await ReminderMeta.findOneAndUpdate(where, set, {
        new: true,
      });
      return reminder;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  findByTimeForCron: async (gtDate, ltDate) => {
    try {
      const reminders = await ReminderMeta.find({
        date: { $gte: gtDate, $lte: ltDate },
        isActive: true,
      })
        .populate({
          path: "reminderId",
          populate: {
            path: "groupId",
          },
        })
        .populate("userId")
        .populate("reminderTo")
        .lean();
      return reminders;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
