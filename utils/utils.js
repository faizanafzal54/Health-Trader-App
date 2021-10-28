const jwt = require("jsonwebtoken");
const config = require("../config").development;

module.exports = {
  sendResponse: function (err, req, res, data) {
    res.setHeader("Content-Type", "application/json");
    if (err === null) {
      switch (req.method) {
        case "GET":
        case "PUT":
          res.statusCode = 200;
          break;
        case "POST":
          res.statusCode = 201;
          break;
        case "DELETE":
          res.statusCode = 204;
          break;
      }
      let response = {
        data: data,
      };
      res.send(data ? response : "");
    } else {
      console.log("Utils Error", err);
      res.statusCode = err.statusCode ? err.statusCode : 500;
      const data = {
        err: {
          message: err.message ? err.message : "Internal server error detected",
          statusCode: res.statusCode,
        },
      };
      res.send(data);
    }
  },
  generateToken: function (data, exp) {
    const token = jwt.sign(data, config.jwtSecret, {
      expiresIn: exp,
    });
    return token;
  },
  generateRandomLink: function () {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 60; i > 0; --i) {
      token += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return token;
  },
};
