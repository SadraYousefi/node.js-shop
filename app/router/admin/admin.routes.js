const { checkPermission } = require('../../http/middleware/permission.guard')
const { BlogAdminRoutes } = require('./blog')
const { categoryRoutes } = require('./category')
const { ChapterRoutes } = require('./chapter')
const { AdminCourseRoutes } = require('./course')
const { EpisodeRoutes } = require('./episode')
const { AdminPermissionRoutes } = require('./permisssion')
const { adminApiProductRouter } = require('./product')
const { AdminRoleRoutes } = require('./role')
const { UserAdminRoutes } = require('./user')
const router = require('express').Router()


router.use("/blog" , BlogAdminRoutes)
router.use('/category', categoryRoutes)
router.use('/products' , adminApiProductRouter)
router.use('/courses' , AdminCourseRoutes)
router.use('/chapters' , ChapterRoutes)
router.use('/episodes' , EpisodeRoutes)
router.use('/users' ,checkPermission(['user-r']) , UserAdminRoutes)
router.use('/role' , AdminRoleRoutes)
router.use('/permissions' , AdminPermissionRoutes)

module.exports = { 
    AdminRoutes : router
}