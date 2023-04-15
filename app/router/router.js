const { redisClient } = require("../utlis/init_redis");
const { APIRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer");
const { authRoutes } = require("./user/auth");

const router = require("express").Router();


router.use("/user", authRoutes);
router.use("/", APIRoutes);
router.use("/developer" , DeveloperRoutes)
module.exports = {
  allRoutes: router,
};
