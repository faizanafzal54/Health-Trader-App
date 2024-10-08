const router = require("express").Router();
const {
  resetPassword,
  verifyResetLink,
  forgotPassword,
  register,
  emailLogin,
  refreshToken,
  uploadProfilePicture,
  removeProfilePicture,
  deactivateAccount,
  updateProfile,
  changePassword,
  facebookSignin,
  inviteUser,
  verifyInviteLink,
  completeRegistration,
  EditUser,
  deleteUser,
  getUser,
  changeTimeZone,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authValidator");

router.post("/login", emailLogin);
router.post("/signup", register);
router.post("/facebook/login", facebookSignin);
router.post("/forgotPassword", forgotPassword);
router.get("/verifyResetLink", verifyResetLink);
router.get("/verifyInviteLink", verifyInviteLink);
router.put("/resetPassword", resetPassword);
router.post("/inviteUser", verifyToken, inviteUser);
router.put("/editUser", verifyToken, EditUser);
router.delete("/deleteUser", verifyToken, deleteUser);
router.put("/completeRegistration", completeRegistration);
router.get("/profile", verifyToken, getUser);

router.put("/refreshToken", refreshToken);
router.put("/profilePicture", verifyToken, uploadProfilePicture);
router.put("/removeProfilePicture", verifyToken, removeProfilePicture);
router.put("/deactivate", verifyToken, deactivateAccount);
router.put("/update", verifyToken, updateProfile);
router.put("/changePassword", verifyToken, changePassword);
router.put("/changeTimeZone", verifyToken, changeTimeZone);
module.exports = router;
