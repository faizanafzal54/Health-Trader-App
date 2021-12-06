const { sendResponse } = require("../utils/utils");
const medicationDao = require("../daos/medicationDao");

module.exports = {
  createMedication: async (req, res) => {
    try {
      const { userId, name, dose, rate, additionalInfo, medicationGroups } =
        req.body;
      const reminder = await medicationDao.create({
        userId,
        name,
        dose,
        rate,
        additionalInfo,
        medicationGroups,
      });
      sendResponse(null, req, res, { reminder });
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
};
