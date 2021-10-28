/* jshint newcap:false */
var startupTime = +new Date();

const express = require("express");
const cors = require("cors");
const app = (module.exports = express());

require("dotenv").config({ path: __dirname + "/.env" });
const PORT = 5000;
const environment = "development";
const mongoose = require("mongoose");

var http = require("http"),
  path = require("path"),
  bodyParser = require("body-parser"),
  config = require("./config").development;

global.config = config;

// app.use(bodyParser.json({ limit: "2mb" }));
// app.use(
//   bodyParser.urlencoded({ extended: true, limit: "2mb", parameterLimit: 50000 })
// );
app.use(express.json());
app.use(
  express.urlencoded({ extended: true, limit: "2mb", parameterLimit: 50000 })
);

//
const fileupload = require("express-fileupload");
app.use(fileupload());
//cors
app.use(cors());

const dbUrl = config.dbPath;
const dbName = config.dbName;

//Db configuration
const db = `mongodb://${dbUrl}${dbName}`;
(async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`Error! Connecting to MongoDB ${err}`);
  }
})();

require("./routes/routes").configure(app);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.set("port", process.env.PORT || PORT);

//db configs

http.createServer(app).listen(app.get("port"), function () {
  console.log("Server started up in millis: ", +new Date() - startupTime);
  console.log(`Server is running at ${app.get("port")}`);
});
