const MyCircle = require("../models/MyCircleModel");

module.exports = {
  create: async (obj) => {
    try {
      let newCircle = new MyCircle(obj);
      const response = await newCircle.save();
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
  findOne: async (userId) => {
    try {
      const circle = await MyCircle.findOne({ userId })
        .populate("friendId")
        .lean();
      return circle;
    } catch (err) {
      throw new Error(err);
    }
  },
  find: async (userId) => {
    try {
      const reminders = await MyCircle.find({ userId })
        .populate("friendId")
        .lean();
      return reminders;
    } catch (err) {
      throw new Error(err);
    }
  },
  findOneAndUpdate: async (where, set) => {
    try {
      const reminder = await MyCircle.findOneAndUpdate(where, set, {
        new: true,
      });
      return reminder;
    } catch (err) {
      throw new Error(err);
    }
  },
};
