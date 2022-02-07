const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  emergencyPhone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
  },
  phone: {
    type: String,
  },
  resetPasswordLink: {
    type: String,
  },
  inviteLink: {
    type: String,
  },
  inviteLinkDate: {
    type: Date,
  },
  invitedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  socialId: {
    type: String,
  },
  socialProvider: {
    type: String,
  },
  isProfileComplete: {
    type: Boolean,
  },
  isDeleted: {
    type: Boolean,
  },
  notifications: {
    textNotifications: {
      isEnable: Boolean,
      isReceiveEvery: Boolean,
      daily: {
        isEnable: Boolean,
        time: Date,
      },
      weekly: {
        isEnable: Boolean,
        time: Date,
      },
    },
    emailNotifications: {
      isEnable: Boolean,
      isReceiveEvery: Boolean,
      daily: {
        isEnable: Boolean,
        time: Date,
      },
      weekly: {
        isEnable: Boolean,
        time: Date,
      },
    },
  },
  emergencyContacts: [
    {
      firstName: String,
      lastName: String,
      role: String,
      email: String,
    },
  ],
  timeZone: {
    type: String,
    default: "America/New_York",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;

// let User = {
//   displayName: "String",
//   firstName: "String",
//   lastName: "String",
//   middleName: "String",
//   email: "String",
//   phone: "String",
//   dateOfBirth: "Date",
//   emergencyContact: "String",
//   address: "String",
//   city: "String",
//   State: "String",
//   country: "String",
//   zip: "Integer",
//   password: "String",
//   socialId: "String", //Facebook
//   socialProvider: "String", //Facebook
//   emailConfirmationLink: "String",
//   resetPasswordLink: "String",
//   inviteLink: "String",
//   inviteLinkDate: "String",
//   role: "Integer",
//   owner: "ObjectId",
//   image: "String",
//   isActive: "Boolean",
// };

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
// let Medications = {}; //  Medication part as per mockups has been convered in Reminders

// let Notifications = {
//   to: "ObjectId",
//   from: "ObjectId",
//   content: "String",
//   isRead: "Boolean",
//   isCompleted: "Boolean",
// };
