const { categoryRoutes } = require('./category')
const router = require('express').Router()

/**
 * @swagger
 *  tags : 
 *      name : Admin-Routes
 *      description : Test for all admin routes!
 */

router.use('/category', categoryRoutes)

module.exports = { 
    AdminRoutes : router
}