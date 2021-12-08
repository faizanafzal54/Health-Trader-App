const { sendResponse } = require("../utils/utils");
const medicationDao = require("../daos/medicationDao");
const groupDao = require("../daos/groupDao");

module.exports = {
  createMedication: async (req, res) => {
    try {
      const { userId, name, dose, rate, additionalInfo, group } = req.body;
      const medication = await medicationDao.create({
        userId,
        name,
        dose,
        rate,
        additionalInfo,
        group,
      });
      const foundMedication = await medicationDao.findOne(medication._id);
      sendResponse(null, req, res, { medication: foundMedication });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getMedicationsOfUser: async (req, res) => {
    try {
      const { userId } = req.query;
      const medications = await medicationDao.find(userId);
      sendResponse(null, req, res, { medications });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  createGroup: async (req, res) => {
    try {
      const { userId, name, medications } = req.body;
      const group = await groupDao.create({
        userId,
        name,
      });
      sendResponse(null, req, res, { group });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getGroupsOfUser: async (req, res) => {
    try {
      const { userId } = req.query;
      const groups = await groupDao.find(userId);
      sendResponse(null, req, res, { groups });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
