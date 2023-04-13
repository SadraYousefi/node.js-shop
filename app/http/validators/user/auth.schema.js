const joi = require("joi");
const getOtpSchema = joi.object({
  //This pattern is created to verify IR(+98) phone number you can create your own
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("Mobile is not Valid")),
});
const checkOtpSchema = joi.object({
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("Mobile is not Valid")),
    code : joi.string().min(4).max(6).error(new Error("Otp dosen't match"))
})
module.exports = {
  getOtpSchema,
  checkOtpSchema,

};
