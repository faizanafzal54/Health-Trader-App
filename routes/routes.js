/*jshint maxstatements: false */
const userRoutes = require("./userRoute");
const reminderRoutes = require("./reminderRoute");
const mycircleRoutes = require("./mycircleRoute");
const medicationRoutes = require("./medicationRoute");
require("../utils/passport").facebookStrategy();

exports.configure = function (app) {
  app.use("/api/users", userRoutes);
  app.use("/api/reminders", reminderRoutes);
  app.use("/api/mycircle", mycircleRoutes);
  app.use("/api/medication", medicationRoutes);
};
