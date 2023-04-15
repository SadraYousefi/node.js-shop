const { redisClient } = require("../utlis/init_redis");
const { APIRoutes } = require("./api");
const { authRoutes } = require("./user/auth");

const router = require("express").Router();

(async()=> {
  await redisClient.set("key" , "value" )
  const value = await redisClient.get("key")
  console.log(value);
})()

router.use("/user", authRoutes);
router.use("/", APIRoutes);
module.exports = {
  allRoutes: router,
};
