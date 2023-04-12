const { APIRoutes } = require("./api");
const { authRoutes } = require("./user/auth");

const router = require("express").Router();
router.use("/user", authRoutes);
router.use("/", APIRoutes);
module.exports = {
  allRoutes: router,
};
