const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user");
require("dotenv").config()
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
module.exports = {
  randomNumberGenerator,
  signAccessToken ,
};
