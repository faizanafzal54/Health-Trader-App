const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myCicleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    friendId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    connectionType: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const MyCircle = mongoose.model("MyCircle", myCicleSchema);
module.exports = MyCircle;

// let MyCircle = {
//   userId: "ObjectId",
//   friends: [
//     {
//       friendId: "ObjectID",
//       connectionType: "String", // Doctors, Family, Friend
//       status: "String",
//     },
//   ],
// };
