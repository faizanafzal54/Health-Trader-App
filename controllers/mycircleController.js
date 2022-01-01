const { sendResponse } = require("../utils/utils");
const mycircleDao = require("../daos/mycircleDao");

module.exports = {
  getMyCircles: async (req, res) => {
    try {
      const { userId } = req.query;
      console.log(userId);
      const mycircle = await mycircleDao.find(userId);
      console.log(mycircle);
      sendResponse(null, req, res, { mycircle });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
