const router = require("express").Router();

const {
  getRemindersOfUser,
  setReminderStatus,
} = require("../controllers/reminderController");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", getRemindersOfUser);
router.put("/setStatus", setReminderStatus);

module.exports = router;
