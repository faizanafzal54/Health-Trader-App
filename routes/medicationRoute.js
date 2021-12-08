const router = require("express").Router();

const {
  getMedicationsOfUser,
  createMedication,
  getGroupsOfUser,
  createGroup,
} = require("../controllers/medicationController");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", verifyToken, getMedicationsOfUser);
router.post("/create", verifyToken, createMedication);
router.get("/groups", verifyToken, getGroupsOfUser);
router.post("/createGroup", verifyToken, createGroup);

module.exports = router;
