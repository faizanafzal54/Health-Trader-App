const { sendResponse } = require("../utils/utils");
const mycircleDao = require("../daos/mycircleDao");

module.exports = {
  getMyCircles: async (req, res) => {
    try {
      const { userId } = req.query;
      const mycircle = await mycircleDao.find(userId);
      sendResponse(null, req, res, { mycircle });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
