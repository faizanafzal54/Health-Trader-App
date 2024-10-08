const Medication = require("../models/MedicationModel");

module.exports = {
  create: async (obj) => {
    try {
      let medication = new Medication(obj);
      const response = await medication.save()
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
  findOne: async (_id) => {
    try {
      const medication = await Medication.findOne({ _id })
        .populate("group")
        .lean();
      return medication;
    } catch (err) {
      throw new Error(err);
    }
  },
  find: async (userId) => {
    try {
      const medications = await Medication.find({ userId, isDeleted: false })
        .populate("group")
        .lean();
      return medications;
    } catch (err) {
      throw new Error(err);
    }
  },
  findOneAndUpdate: async (where, set) => {
    try {
      const medication = await Medication.findOneAndUpdate(where, set, {
        new: true,
      });
      return medication;
    } catch (err) {
      throw new Error(err);
    }
  },
  findByIdAndDelete: async (_id) => {
    try {
      const response = await Medication.findByIdAndDelete(_id);
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
