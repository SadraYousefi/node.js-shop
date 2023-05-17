const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user");
require("dotenv").config();
const { redisClient } = require("./init_redis");
const fs = require("fs");
const path = require("path");
const { log } = require("console");
function randomNumberGenerator() {
  return Math.floor(Math.random() * 100000);
}
function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      options,
      (err, token) => {
        if (err) reject(createHttpError.InternalServerError("Internal Server"));
        resolve(token);
      }
    );
  });
}

function signRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      options,
      async (err, token) => {
        if (err) reject(createHttpError.InternalServerError("Internal Server"));
        await redisClient.SETEX(user.mobile, 31536000, token);
        resolve(token);
      }
    );
  });
}

function verifyRefreshToken(token) {
  return new Promise((res, rej) => {
    JWT.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, payload) => {
        if (err) rej(createHttpError.Unauthorized("please login first"));
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) rej(createHttpError.Unauthorized("Your dont have account"));
        const refreshToken = await redisClient.get(user.mobile);
        if (token !== refreshToken)
          rej(createHttpError.Unauthorized("Refresh Token is not valid"));
        return res(mobile);
      }
    );
  });
}

function deletePublicImage(file) {
  if (Array.isArray(file)) {
    for (const item of file) {
      const filepath = path.join(__dirname, "..", "..", "public", item);
      fs.unlinkSync(filepath);
    }
  } else {
    const filepath = path.join(__dirname, "..", "..", "public", file);
    fs.unlinkSync(filepath);
  }
}

function databasePathMaker(fileuploadpath, filename) {
  return path.join(fileuploadpath, filename).replace(/\\/g, "/");
}
function deleteInvalidObjectData(data = {}, allowedFields = []) {
  const nullishData = ["", " ", 0, "0", null, undefined];
  Object.keys(data).forEach((key) => {
    if (!allowedFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].lenght > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].lenght == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
  return data;
}
function convertVideoTimeFormat(time) {
  let total = Math.round(time) / 60;
  let [min, percentage] = String(total).split(".");
  if(percentage == undefined) percentage = "0"
  let sec = Math.round(((percentage.substring(0,2)) * 60) / 100);
  let hour = 0;
  if (min > 59) {
    total = min / 60;
    [hour , percentage] = String(total).split(".")
    if(percentage == undefined) percentage = "0"
    min = Math.round(((percentage.substring(0,2)) * 60) / 100);
  }
  if(hour < 10 ) hour = `0${hour}` ;
  if(min < 10) min = `0${min}`
  if(sec < 10) sec = `0${sec}`
  return hour + ":" + min + ":" + sec;
}

function getCourseTime(chapters = []) {
  let time, sec =0 ;
  for (const chapter of chapters) {
    for (const episode of chapter.episodes) {
      if(episode?.time) time = episode.time.split(":")
      else time = "00:00:00".split(":")
      sec += Number(time[0])*3600
      sec += Number(time[1])*60
      sec += Number(time[2])
    }
  }
  return convertVideoTimeFormat(sec)
}
module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  deletePublicImage,
  databasePathMaker,
  deleteInvalidObjectData,
  convertVideoTimeFormat,
  getCourseTime,
};
