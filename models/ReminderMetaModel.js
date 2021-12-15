const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metaSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reminderId: {
      type: Schema.Types.ObjectId,
      ref: "Reminder",
    },
    isActive: {
      type: Boolean,
    },
    status: {
      type: String,
    },
    date: {
      type: Date,
    },
    reminderTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const ReminderMeta = mongoose.model("ReminderMeta", metaSchema);
module.exports = ReminderMeta;
