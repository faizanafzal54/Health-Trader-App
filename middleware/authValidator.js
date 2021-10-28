const jwt = require("jsonwebtoken");
const config = require("../config").development;
const { sendResponse } = require("../utils/utils");

exports.verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      const authData = await jwt.verify(bearerToken, config.jwtSecret);
      if (authData.ip === req.ip) {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    err.statusCode = 401;
    sendResponse(err, req, res, err);
  }
};
