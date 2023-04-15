const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user");
require("dotenv").config()
const {redisClient} = require("./init_redis")
function randomNumberGenerator() {
  return Math.floor(Math.random() * 100000);
}
function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId)
    const payload = {
        mobile : user.mobile ,
    };
    const options = {
        expiresIn : "1h"
    };
    JWT.sign(payload , process.env.ACCESS_TOKEN_SECRET_KEY ,options , (err , token)=> { 
        if(err) reject(createHttpError.InternalServerError("Internal Server"))
        resolve(token)

    } )
  });
}

function signRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId)
    const payload = {
        mobile : user.mobile ,
    };
    const options = {
        expiresIn : "1y"
    };
    JWT.sign(payload , process.env.REFRESH_TOKEN_SECRET_KEY ,options ,async (err , token)=> { 
        if(err) reject(createHttpError.InternalServerError("Internal Server"))
        await redisClient.SETEX(user.mobile ,31536000, token )
        resolve(token)

    } )
  });
}

function verifyRefreshToken(token) {
  return new Promise((res , rej)=>{
    JWT.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, payload) => {
        if (err)
          rej(createHttpError.Unauthorized("please login first"));
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user)
          rej(createHttpError.Unauthorized("Your dont have account"));
        const refreshToken = await redisClient.get(user.mobile);
        if(token !== refreshToken) rej(createHttpError.Unauthorized("Refresh Token is not valid"))
        return res(mobile)
      }
    );
  })
}

module.exports = {
  randomNumberGenerator,
  signAccessToken ,
  signRefreshToken ,
  verifyRefreshToken
};
