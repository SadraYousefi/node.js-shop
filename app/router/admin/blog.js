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
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
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

/**
 * @swagger
 *  /admin/blog/getpost/{id}:
 *      get : 
 *          summary : get post by id
 *          tags : [BlogAdminRoutes]
 *          description : send valid mongodb
 *          parameters : 
 *              -   in : header
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  requried : true
 *                  type : string
 *                  name : accesstoken
 *              -   in : path
 *                  name : id
 *                  description : send valid mongodb id
 *                  required : true
 *                  type : string
 *          responses : 
 *              201 :   
 *                  description : Success 
 *                  
 */
router.get('/getpost/:id' , BlogAdminController.getPostById)

/**
 * @swagger
 *  /admin/blog/{id} :
 *      delete : 
 *          summary : delete post by id
 *          tags : [BlogAdminRoutes]
 *          parameters : 
 *              -   in : header
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  requried : true
 *                  type : string
 *                  name : accesstoken
 *              -   in : path
 *                  name : id
 *                  description : send valid mongodb id
 *                  required : true
 *                  type : string
 *          responses : 
 *              202 :   
 *                  description : Success 
 *          
 */
router.delete("/:id" , BlogAdminController.deletePostById)

/**
 * @swagger
 *  /admin/blog/{id} : 
 *      patch : 
 *          summary : update post
 *          description : upadte post by id
 *          consumes : 
 *              -   multipart/form-data
 *          tags : [BlogAdminRoutes]
 *          parameters : 
 *              -   in : header
 *                  name : accesstoken
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  required : true
 *                  type : string
 *                  example : bearer ...token
 *              -   in : path
 *                  name : id
 *                  required : true
 *                  type : string                
 *              -   in : formData
 *                  name : title
 *                  type : string                
 *              -   in : formData
 *                  name : short_text
 *                  type : string                
 *              -   in : formData
 *                  name : text
 *                  type : string                
 *              -   in : formData
 *                  name : category
 *                  value : 643c31c49720615be7b8f715
 *                  type : string                
 *              -   in : formData
 *                  example : tag1#tag2#tag_sth || str || []
 *                  name : tags
 *                  type : string                
 *              -   in : formData
 *                  name : image
 *                  type : file   
 *          responses :
 *              201 :    
 *                  description : Created             
 */
router.patch("/:id" , uploadFile.single('image'), stringToArray('tags') , BlogAdminController.editPostById)
module.exports = { 
    BlogAdminRoutes : router
}