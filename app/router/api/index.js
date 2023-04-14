const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken');
const router = require('express').Router()
/**
 * @swagger
 * tags : 
 *  name : IndexPage
 *  description : index page of website and routes
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary : index of routes
 *      tags : [IndexPage]
 *      description : get almost everything
 *      parameters : 
 *      -   in : header
 *          name : accesstoken
 *          example : bearer yourtoken
 *      responses:
 *          200 :
 *              description : success
 *          404 :  
 *              description : notFound
 */


router.route("/").get(verifyAccessToken,homeController.indexPage);

module.exports = { 
    APIRoutes : router
}