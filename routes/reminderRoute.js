const router = require("express").Router();

const {
  getRemindersOfUser,
  setReminderStatus,
  createReminder,
  getCalendarReminders,
} = require("../controllers/reminderController");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", verifyToken, getRemindersOfUser);
router.get("/calendarReminders", verifyToken, getCalendarReminders);
router.post("/create", verifyToken, createReminder);
router.put("/setStatus", verifyToken, setReminderStatus);

module.exports = router;
