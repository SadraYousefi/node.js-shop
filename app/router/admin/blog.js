const { BlogAdminController } = require("../../http/controllers/admin/blog.controller")
const { stringToArray } = require("../../http/middleware/stringToArray")
const { uploadFile } = require("../../utlis/multer")

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

/**
 * @swagger
 *  /admin/blog/add : 
 *      post : 
 *          summary : Adding post
 *          description : get required data for adding post + examples
 *          consumes : 
 *              -   multipart/form-data
 *          tags : [BlogAdminRoutes]
 *          parameters : 
 *              -   in : formData
 *                  name : title
 *                  required : true
 *                  type : string                
 *              -   in : formData
 *                  name : short_text
 *                  required : true
 *                  type : string                
 *              -   in : formData
 *                  name : text
 *                  required : true
 *                  type : string                
 *              -   in : formData
 *                  name : category
 *                  required : true
 *                  type : string                
 *              -   in : formData
 *                  example : tag1#tag2#tag_sth || str || []
 *                  name : tags
 *                  type : string                
 *              -   in : formData
 *                  name : image
 *                  required : true
 *                  type : file   
 *          responses :
 *              200 :    
 *                  description : Success              
 */
router.post('/add' ,uploadFile.single("image"),stringToArray('tags') , BlogAdminController.createPost)

module.exports = { 
    BlogAdminRoutes : router
}