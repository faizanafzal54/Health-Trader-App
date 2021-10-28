const { sendResponse } = require("../utils/utils");
const mycircleDao = require("../daos/mycircleDao");

module.exports = {
  getMyCircles: async (req, res) => {
    try {
      const { userId } = req.query;
      //   await mycircleDao.create({
      //     userId: "6156ff01b99e6f9f6f99b9d7",
      //     friends: [
      //       {
      //         friendId: "614f3aae7b77b9a0e6441ced",
      //         connectionType: "Friend",
      //         status: "",
      //       },
      //     ],
      //   });
      const mycircle = await mycircleDao.find(userId);
      if (mycircle !== null) {
        sendResponse(null, req, res, { mycircle });
      } else {
        sendResponse(null, req, res, {
          mycircle: {
            friends: [],
          },
        });
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
