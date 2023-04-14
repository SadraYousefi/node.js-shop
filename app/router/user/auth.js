const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();

/**
 * @swagger
 *  tags : 
 *      name : User-Authentication
 *      description : user auth section
 */

/**
 * @swagger 
 *  /user/login : 
 *      post:
 *          summary : login user to panel using number
 *          tags : [User-Authentication]
 *          description : OTP
 *          parameters : 
 *          -   name : mobile
 *              description : IR Phone Number
 *              in : formData
 *              required: true
 *              type: string
 *          responses : 
 *              201:
 *                  description : Success
 *              400:
 *                  description : Bad Request
 *              401:
 *                  description : Unauthorization
 *              500:
 *                  description : Internal Server Error 
 */

router.route("/login").post(UserAuthController.getOtp);
/**
 * @swagger
 *  /user/get-otp:
 *    post: 
 *      summary : check otp sent by user to grant jwt token
 *      description : checkOTp
 *      tags: [User-Authentication]
 *      parameters:
 *      -   name : mobile
 *          description : IR phone number
 *          in: formData
 *          required: true
 *          type: string
 *      -   name: code
 *          description : code which sended to use number
 *          in: formData
 *          required: true
 *          type: string
 *      responses : 
 *              201:
 *                  description : Success
 *              400:
 *                  description : Bad Request
 *              401:
 *                  description : Unauthorization
 *              500:
 *                  description : Internal Server Error 
 *        
 */
router.route("/get-otp").post(UserAuthController.checkOtp)
/**
 * @swagger
 * /user/refresh-token :
 *  post : 
 *    summary : send refresh token to get new token and refresh token
 *    description : refreshToken
 *    tags : [User-Authentication]
 *    parameters : 
 *    - in : body
 *      required : true
 *      type : string 
 *      name : refreshToken
 *    responses : 
 *      200:
 *        description : success
 */
router.route("/refresh-token").post(UserAuthController.refreshToken)
module.exports = {
  authRoutes: router,
};
