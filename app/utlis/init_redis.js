const redis = require("redis")
const redisClient = redis.createClient();
redisClient.connect()
redisClient.on("connect" , ()=> console.log("Connecting To redis"))
redisClient.on("error" , (error)=> console.log(`redis error : ${error.message}`))
redisClient.on("connected" , ()=> console.log("Connected"))
redisClient.on("end" , ()=> console.log("Disconnected from Redis"))
module.exports = { 
    redisClient
}