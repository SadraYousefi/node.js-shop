const createHttpError = require("http-errors");
const { UserModel } = require("../../models/user");
require("dotenv").config();
const JWT = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  const headers = req?.headers;
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if ((token, bearer?.toLowerCase() === "bearer")) {
    JWT.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        if (err)
          return next(createHttpError.Unauthorized("please login first"));
        const { mobile } = payload;
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user)
          return next(createHttpError.Unauthorized("Your dont have account"));
        req.user = user;
        return next();
      }
    );
  } else return next(createHttpError.Unauthorized("please login first!"));
}

function getToken(headers) {
  // const headers = headers;
  const [bearer, token] = headers?.accesstoken?.split(" ") || [];
  if (!token && bearer.toLowerCase() == "bearer")
    throw createHttpError.Unauthorized("you are unautorized user");
  return token;
}

function checkRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;
      if (user?.roles?.includes(role)) return next();
      throw createHttpError.Forbidden(`Your role is : ${user.roles[0]} and you shoud be : "ADMIN" `);
    } catch (error) {
      next(error)
    }
  };
}
module.exports = {
  verifyAccessToken,
  checkRole ,
};
