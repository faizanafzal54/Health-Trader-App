const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    reminderType: {
      type: String,
    },
    startDateTime: {
      type: Date,
    },
    isRepeating: {
      type: Boolean,
    },
    reminderFrequency: {
      type: String, //Day, Week, Month
    },
    dayOfWeek: {
      type: String, //Mon, Tue, Wed,
    },
    repeatEvery: {
      type: String, //1day, 1week, 1month
    },
    duration: {
      type: String, //once,forever,uptil
    },
    terminationDate: {
      type: Date,
    },
    terminationDate: {
      type: String,
    },
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    comments: {
      type: String,
    },

    isActive: {
      type: Boolean,
    },
    reminderTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;

// let Reminders = {
//   userId: "ObjectId",
//   subject: "String",
//   howMuch: "String",
//   link: "String",
//   details: "String",
//   predefinedTime: "Date",
//   medicationStartDate: "Date",
//   medicationEndDate: "Date",
//   reminderType: {
//     mobile: "Boolean",
//     email: "Boolean",
//   },
//   isCompleted: "Boolean",
//   reminderTo: ["ObjectId"], //followups
//   isActive: "Boolean",
// };
