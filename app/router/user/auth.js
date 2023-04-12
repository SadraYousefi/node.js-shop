const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
router.route("/login").post(UserAuthController.login);

module.exports = {
  authRoutes: router,
};
