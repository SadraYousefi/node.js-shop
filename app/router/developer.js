const { randomNumberGenerator } = require("../utlis/functions")
const bcrypt = require("bcrypt")
const router = require("express").Router()
/**
 * @swagger
 * tags:
 *  name : Developer-Tools
 *  description : Developer Tools
 */

/**
 * @swagger
 *  /developer/hash-string/{data}:
 *      post:
 *          summary: Hash String
 *          description : req string in params and send hashed string
 *          tags: [Developer-Tools]
 *          parameters : 
 *              - in: path
 *                type: string
 *                name: data
 *                required: true
 *          responses:
 *              200:
 *                  description : success
 */
router.route("/hash-string/:data").post((req , res , next)=>{
    const {data} = req.params ;
    return res.send(bcrypt.hashSync(data , bcrypt.genSaltSync(10)))
})

/**
 * @swagger
 *  /developer/random-number :
 *      get :
 *          summary: Generating random number
 *          description : random number
 *          tags: [Developer-Tools]
 *          responses:
 *              200 :
 *                  description : success
 */
router.route('/random-number').get((req , res , next)=> {
    return res.send(randomNumberGenerator().toString())
})
module.exports = {
    DeveloperRoutes : router
}