const Group = require("../models/GroupModel");

module.exports = {
  create: async (obj) => {
    try {
      let group = new Group(obj);
      const response = await group.save();
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
  findOne: async (userId) => {
    try {
      const group = await Group.findOne({ userId })
        // .populate("friendId")
        .lean();
      return group;
    } catch (err) {
      throw new Error(err);
    }
  },
  find: async (userId) => {
    try {
      const groups = await Group.find({ userId, isDeleted: false })
        // .populate("friendId")
        .lean();
      return groups;
    } catch (err) {
      throw new Error(err);
    }
  },
  findOneAndUpdate: async (where, set) => {
    try {
      const group = await Group.findOneAndUpdate(where, set, {
        new: true,
      });
      return group;
    } catch (err) {
      throw new Error(err);
    }
  },
  findByIdAndDelete: async (_id) => {
    try {
      const response = await Group.findByIdAndDelete(_id);
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
