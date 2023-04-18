const { BlogAdminController } = require("../../http/controllers/admin/blog.controller")
const { stringToArray } = require("../../http/middleware/stringToArray")
const { uploadFile } = require("../../utlis/multer")

const router = require("express").Router()

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgwMzQ5MSwiZXhwIjoxNjgxODA3MDkxfQ.RJoL0RbJdkZmhzg4b5N9WkWhy5ci2pt_4P99TbufcM0

/**
 * @swagger
 *  /admin/blog:
 *      get:
 *              summary : All POSTS
 *              tags : [BlogAdminRoutes]
 *              description : return all posts of blog
 *              parameters : 
 *              -   in : header
 *                  name : accesstoken
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgwNzI3MiwiZXhwIjoxNjgxODEwODcyfQ.qyFe0Y9vHiDIsVmcb7UdLRNHebk8sn-l2LnX1_eCiAA
 *                  required : true
 *                  type : string
 *                  example : bearer ...token
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
 *              -   in : header
 *                  name : accesstoken
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgwNzI3MiwiZXhwIjoxNjgxODEwODcyfQ.qyFe0Y9vHiDIsVmcb7UdLRNHebk8sn-l2LnX1_eCiAA
 *                  required : true
 *                  type : string
 *                  example : bearer ...token
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
 *                  value : 643c31c49720615be7b8f715
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
 *              201 :    
 *                  description : Created             
 */
router.post('/add' ,uploadFile.single("image"),stringToArray('tags') , BlogAdminController.createPost)

module.exports = { 
    BlogAdminRoutes : router
}