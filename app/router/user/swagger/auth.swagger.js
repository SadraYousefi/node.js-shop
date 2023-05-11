/**
 * @swagger
 *  components :
 *    schemas :
 *      GetOtp : 
 *        type : object
 *        required : 
 *          - mobile
 *        properties : 
 *          mobile : 
 *            type : string
 *            description : User mobile for signup/in
 *      CheckOtp : 
 *        type : object
 *        required : 
 *          - mobile
 *          - code
 *        properties : 
 *          mobile : 
 *            type : string
 *            description : User mobile
 *          code : 
 *            type : string
 *            description : Otp code has been sended to user !
 *      RefreshToken : 
 *        type : object
 *        required : 
 *          - refreshToken
 *        properties : 
 *          refreshToken : 
 *            type : string
 *            description : generate new token using refreshToken
 */

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
 *          requestBody : 
 *            required : true
 *            content : 
 *              application/x-www-form-urlencoded : 
 *                schema : 
 *                  $ref : '#/components/schemas/GetOtp'
 *              application/json : 
 *                schema : 
 *                  $ref : '#/components/schemas/GetOtp'
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

/**
 * @swagger
 *  /user/get-otp:
 *    post: 
 *      summary : check otp sent by user to grant jwt token
 *      description : checkOTp
 *      tags: [User-Authentication]
 *      requestBody : 
 *        required : true
 *        content : 
 *          application/x-www-form-urlencoded : 
 *            schema : 
 *              $ref : '#/components/schemas/CheckOtp'
 *          application/json : 
 *            schema : 
 *              $ref : '#/components/schemas/CheckOtp'
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
/**
 * @swagger
 * /user/refresh-token :
 *  post : 
 *    summary : send refresh token to get new token and refresh token
 *    description : refreshToken
 *    tags : [User-Authentication]
 *    requestBody : 
 *      required : true
 *      content : 
 *        application/x-www-form-urlencoded : 
 *          schema : 
 *            $ref : "#/components/schemas/RefreshToken"
 *        application/json : 
 *          schema : 
 *            $ref : "#/components/schemas/RefreshToken"
 *    responses : 
 *      200:
 *        description : success
 */