const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reminderType: {
      type: String,
    },
    subject: {
      type: String,
    },
    howMuch: {
      type: String,
    },
    link: {
      type: String,
    },
    details: {
      type: String,
    },
    predefinedTime: {
      type: Date,
    },
    medicationStartDate: {
      type: Date,
    },
    medicationEndDate: {
      type: Date,
    },
    notificationType: {
      mobile: Boolean,
      email: Boolean,
    },
    status: {
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
