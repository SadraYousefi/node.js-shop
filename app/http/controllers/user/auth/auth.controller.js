const createHttpError = require("http-errors");
const Controller = require("../../controller");
const { getOtpSchema , checkOtpSchema } = require("../../../validators/user/auth.schema");
const { randomNumberGenerator, signAccessToken, verifyRefreshToken, signRefreshToken } = require("../../../../utlis/functions");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utlis/constant");
const {UserModel} = require("./../../../../models/user.js");
const user = require("./../../../../models/user");
class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      if (!result){
        throw createHttpError.Unauthorized("Login was not succesful!");}
      return res.status(200).json({
        data: {
          statusCode: 200,
          msg: "Otp sent successfully",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async checkOtp(req , res , next) { 
    try {
      await checkOtpSchema.validateAsync(req.body)
      const {mobile , code} = req.body
      const user = await UserModel.findOne({mobile})
      if(!user) throw createHttpError.Unauthorized("Your mobile does not match in our system")
      if(user.otp.code != code) throw createHttpError.Unauthorized("Otp is not working")
      const now = Date.now()
      if(+user.otp.expiresIn < now ) throw createHttpError.Unauthorized("OTP is expired")
      const accessToken = await signAccessToken(user._id)
      const refreshToken = await signRefreshToken(user._id)
      return res.status(201).json({
        data : {
          accessToken ,
          refreshToken
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async saveUser(mobile, code) {
    const result = await this.checkExistUser(mobile);
    let otp = {
      code,
      expiresIn: (new Date().getTime()+120000),
    };
    if (result) 
    {
      return await this.updateUser(mobile, {otp});
    }
    return (await UserModel.create({
      mobile,
      otp,
    })) ;
  }
  async checkExistUser(mobile) {
    const user = UserModel.findOne({ mobile });
    return user;
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
  async refreshToken(req , res , next) { 
    try {
      const {refreshToken} = req.body ;
      const mobile = await verifyRefreshToken(refreshToken)
      const user = await UserModel.findOne({mobile})
      const accessToken = await signAccessToken(user._id)
      const newRefreshToken = await signRefreshToken(user._id)
      return res.json({
        data : {
          accessToken , 
          refreshToken : newRefreshToken
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = {
  UserAuthController: new UserAuthController(),
};
