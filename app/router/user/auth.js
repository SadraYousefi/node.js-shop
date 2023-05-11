const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();

router.route("/get-otp").post(UserAuthController.checkOtp)
router.route("/login").post(UserAuthController.getOtp);
router.route("/refresh-token").post(UserAuthController.refreshToken)

module.exports = {
  authRoutes: router,
};
