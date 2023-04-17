const { BlogAdminRoutes } = require('./blog')
const { categoryRoutes } = require('./category')
const router = require('express').Router()

/**
 * @swagger
 *  tags : 
 *   -   name : Admin-Routes
 *       description : Test for all admin routes!
 *   -   name : BlogAdminRoutes
 *       description : available routes for blog management
 */

router.use("/blog" , BlogAdminRoutes)
router.use('/category', categoryRoutes)

module.exports = { 
    AdminRoutes : router
}