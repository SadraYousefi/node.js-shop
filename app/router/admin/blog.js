const { BlogAdminController } = require("../../http/controllers/admin/blog.controller")

const router = require("express").Router()

/**
 * @swagger
 *  /admin/blog:
 *      get:
 *              summary : All POSTS
 *              tags : [BlogAdminRoutes]
 *              description : return all posts of blog
 *              responses : 
 *                  200 : 
 *                      description : Success
 */

router.get('/' , BlogAdminController.getAllPost)

module.exports = { 
    BlogAdminRoutes : router
}