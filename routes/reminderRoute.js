const router = require("express").Router();

const {
  getRemindersOfUser,
  setReminderStatus,
  createReminder,
} = require("../controllers/reminderController");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", getRemindersOfUser);
router.post("/create", createReminder);
router.put("/setStatus", setReminderStatus);

module.exports = router;
