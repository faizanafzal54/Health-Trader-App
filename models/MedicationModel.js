const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicationSchema = new Schema(
  {
    //   medicationGroups: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    dose: {
      type: String,
    },
    rate: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Medication = mongoose.model("Medication", medicationSchema);
module.exports = Medication;
