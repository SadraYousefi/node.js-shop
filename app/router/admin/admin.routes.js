const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken')
const { BlogAdminRoutes } = require('./blog')
const { categoryRoutes } = require('./category')
const { AdminCourseRoutes } = require('./course')
const { adminApiProductRouter } = require('./product')
const router = require('express').Router()


router.use("/blog" , BlogAdminRoutes)
router.use('/category', categoryRoutes)
router.use('/products' , adminApiProductRouter)
router.use('/courses' , AdminCourseRoutes)

module.exports = { 
    AdminRoutes : router
}