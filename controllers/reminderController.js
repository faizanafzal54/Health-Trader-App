const { sendResponse } = require("../utils/utils");
const reminderDao = require("../daos/reminderDao");
const reminderMetaDao = require("../daos/reminderMetaDao");

module.exports = {
  createReminder: async (req, res) => {
    try {
      const {
        userId,
        reminderType,
        startDateTime,
        isRepeating,
        reminderFrequency,
        dayOfWeek,
        repeatEvery,
        duration,
        terminationDate,
        name,
        location,
        comments,
        medicationGroup,
      } = req.body;
      console.log(req.body);
      const reminder = await reminderDao.create({
        userId,
        reminderType,
        startDateTime,
        isRepeating,
        reminderFrequency,
        dayOfWeek,
        repeatEvery,
        duration,
        terminationDate,
        name,
        location,
        comments,
        isActive: true,
        status: "",
        groupId: medicationGroup,
      });

      if (!isRepeating) {
        let obj = {
          userId: userId,
          reminderId: reminder._id,
          isActive: true,
          status: "",
          date: startDateTime,
          reminderTo: [],
        };
        const meta = await reminderMetaDao.insertMany([obj]);
        console.log(meta);
      } else {
        let docs = [];
        switch (reminderFrequency) {
          case "daily":
            if (duration === "once") {
              docs.push({
                userId: userId,
                reminderId: reminder._id,
                isActive: true,
                status: "",
                date: startDateTime,
                reminderTo: [],
              });
            } else if (duration === "uptill") {
              let loop = new Date(startDateTime);
              while (loop <= new Date(terminationDate)) {
                docs.push({
                  userId: userId,
                  reminderId: reminder._id,
                  isActive: true,
                  status: "",
                  date: loop,
                  reminderTo: [],
                });

                const tempDate = loop.setDate(
                  loop.getDate() + parseInt(repeatEvery)
                );
                loop = new Date(tempDate);
              }
            } else if (duration === "forever") {
              for (let i = 1; i <= 365; i += parseInt(repeatEvery)) {
                console.log(i);
                let today = new Date(startDateTime);
                today.setDate(today.getDate() + i);
                docs.push({
                  userId: userId,
                  reminderId: reminder._id,
                  isActive: true,
                  status: "",
                  date: today,
                  reminderTo: [],
                });
              }
            }
            break;
          case "weekly":
            if (duration === "once") {
              docs.push({
                userId: userId,
                reminderId: reminder._id,
                isActive: true,
                status: "",
                date: startDateTime,
                reminderTo: [],
              });
            } else if (duration === "uptill") {
              let loop = new Date(startDateTime);
              while (loop <= new Date(terminationDate)) {
                docs.push({
                  userId: userId,
                  reminderId: reminder._id,
                  isActive: true,
                  status: "",
                  date: loop,
                  reminderTo: [],
                });
                let sum = 7 * parseInt(repeatEvery);
                const tempDate = loop.setDate(loop.getDate() + sum);
                loop = new Date(tempDate);
              }
            } else if (duration === "forever") {
              let sum = 7 * parseInt(repeatEvery);
              for (let i = 1; i <= 365; i += sum) {
                console.log(i);
                let today = new Date(startDateTime);
                today.setDate(today.getDate() + i);
                docs.push({
                  userId: userId,
                  reminderId: reminder._id,
                  isActive: true,
                  status: "",
                  date: today,
                  reminderTo: [],
                });
              }
            }
            break;
          case "monthly":
            if (duration === "once") {
              docs.push({
                userId: userId,
                reminderId: reminder._id,
                isActive: true,
                status: "",
                date: startDateTime,
                reminderTo: [],
              });
            } else if (duration === "uptill") {
              let loop = new Date(startDateTime);
              while (loop <= new Date(terminationDate)) {
                docs.push({
                  userId: userId,
                  reminderId: reminder._id,
                  isActive: true,
                  status: "",
                  date: loop,
                  reminderTo: [],
                });
                const tempDate = loop.setMonth(
                  loop.getMonth() + parseInt(repeatEvery)
                );
                loop = new Date(tempDate);
              }
            } else if (duration === "forever") {
              for (let i = 0; i <= 22; i += parseInt(repeatEvery)) {
                console.log(i);
                let today = new Date(startDateTime);
                today.setMonth(today.getMonth() + i);
                docs.push({
                  userId: userId,
                  reminderId: reminder._id,
                  isActive: true,
                  status: "",
                  date: today,
                  reminderTo: [],
                });
              }
            }
            break;
          default:
            break;
        }
        const meta = await reminderMetaDao.insertMany(docs);
      }

      sendResponse(null, req, res, { reminder });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getRemindersOfUser: async (req, res) => {
    try {
      const { userId } = req.query;

      let tempgt = new Date();
      const gtDate = tempgt.setDate(tempgt.getDate() - 1); // Start Date
      let templt = new Date();
      const ltDate = templt.setDate(templt.getDate() + 30); // End Date to get reminders

      const reminders = await reminderMetaDao.findByMonth(
        userId,
        gtDate,
        ltDate
      );
      let formattedReminders = reminders.map((reminder) => {
        return {
          metaId: reminder._id,
          createdAt: reminder.createdAt,
          date: reminder.date,
          isActive: reminder.isActive,
          status: reminder.status,
          userId: reminder.userId,
          reminderId: reminder.reminderId?._id,
          name: reminder.reminderId?.name,
          reminderFrequency: reminder.reminderId?.reminderFrequency,
          reminderType: reminder.reminderId?.reminderType,
          comments: reminder.reminderId?.comments,
          location: reminder.reminderId?.location,
          reminderTypereminderType:
            reminder.reminderId?.reminderTypereminderType,
          terminationDate: reminder.reminderId?.terminationDate,
          groupId: reminder.reminderId?.groupId._id,
          groupName: reminder.reminderId?.groupId.name,
        };
      });
      sendResponse(null, req, res, { reminders: formattedReminders });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  setReminderStatus: async (req, res) => {
    try {
      const { metaId, status } = req.body;
      const updatedReminder = await reminderMetaDao.findOneAndUpdate(
        { _id: metaId },
        { $set: { status } }
      );
      sendResponse(null, req, res, { reminder: updatedReminder });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
