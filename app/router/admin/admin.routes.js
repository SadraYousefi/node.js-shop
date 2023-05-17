const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken')
const { BlogAdminRoutes } = require('./blog')
const { categoryRoutes } = require('./category')
const { ChapterRoutes } = require('./chapter')
const { AdminCourseRoutes } = require('./course')
const { EpisodeRoutes } = require('./episode')
const { adminApiProductRouter } = require('./product')
const router = require('express').Router()


router.use("/blog" , BlogAdminRoutes)
router.use('/category', categoryRoutes)
router.use('/products' , adminApiProductRouter)
router.use('/courses' , AdminCourseRoutes)
router.use('/chapters' , ChapterRoutes)
router.use('/episodes' , EpisodeRoutes)

module.exports = { 
    AdminRoutes : router
}