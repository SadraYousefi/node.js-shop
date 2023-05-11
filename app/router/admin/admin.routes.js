const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken')
const { BlogAdminRoutes } = require('./blog')
const { categoryRoutes } = require('./category')
const { AdminCourseRoutes } = require('./course')
const { adminApiProductRouter } = require('./product')
const router = require('express').Router()

/**
 * @swagger
 *  tags : 
 *   -   name : CourseAdminRoutes
 *       description : routes for course and chapters
 *   -   name : Admin-Routes
 *       description : Test for all admin routes!
 *   -   name : ProductAdminRoutes
 *       description : Route to modify products as admin
 *   -   name : CategoryRoutes
 *       description : All Routes For category
 *   -   name : BlogAdminRoutes
 *       description : available routes for blog management
 */

router.use("/blog" , BlogAdminRoutes)
router.use('/category', categoryRoutes)
router.use('/products' , adminApiProductRouter)
router.use('/courses' , AdminCourseRoutes)

module.exports = { 
    AdminRoutes : router
}