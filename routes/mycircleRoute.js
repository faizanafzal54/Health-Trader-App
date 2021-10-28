const router = require("express").Router();

const { getMyCircles } = require("../controllers/mycircleController");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", getMyCircles);

module.exports = router;
