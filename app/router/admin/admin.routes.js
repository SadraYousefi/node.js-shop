const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken')
const { BlogAdminRoutes } = require('./blog')
const { categoryRoutes } = require('./category')
const router = require('express').Router()

/**
 * @swagger
 *  tags : 
 *   -   name : Admin-Routes
 *       description : Test for all admin routes!
 *   -   name : CategoryRoutes
 *       description : All Routes For category
 *   -   name : BlogAdminRoutes
 *       description : available routes for blog management
 */

router.use("/blog" , verifyAccessToken , BlogAdminRoutes)
router.use('/category', categoryRoutes)

module.exports = { 
    AdminRoutes : router
}