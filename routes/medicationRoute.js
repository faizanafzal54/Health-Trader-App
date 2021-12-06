const router = require("express").Router();

const {
  getMedicationsOfUser,
  createMedication,
} = require("../controllers/medicationController");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", verifyToken, getMedicationsOfUser);
router.post("/create", verifyToken, createMedication);

module.exports = router;
