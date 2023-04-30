const { CategoryController } = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

/**
 * @swagger
 *  components : 
 *      schemas : 
 *          Category : 
 *              type : object
 *              required : 
 *                  -   title
 *              properties : 
 *                  title : 
 *                      type : string
 *                      description : Title for your category
 *                  parent : 
 *                      type : string
 *                      description : an object id pointing to parent category
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post :
 *          summary : Creating category
 *          description : creating category using title and parent objectID
 *          tags: [CategoryRoutes]
 *          parameters : 
 *              -   in : header
 *                  name : accessToken
 *                  required : true
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  type  : string
 *          requestBody : 
 *              required : true 
 *              content : 
 *                  application/x-www-form-urlencoded : 
 *                      schema : 
 *                          $ref : "#/components/schemas/Category"
 *          responses : 
 *              200:
 *                  description : success
 */
router.route("/add").post(CategoryController.addCategory)

/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags : [CategoryRoutes]
 *      summary : Getting all parent of categories
 *      description : only get parents
 *      parameters : 
 *              -   in : header
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  requried : true
 *                  type : string
 *                  name : accesstoken
 *      responses:
 *          200 :
 *              description : Suceess
 */
router.get('/parents' ,CategoryController.getParentsCategories )

/**
 * @swagger
 *  /admin/category/getall :
 *      get :
 *          summary : return all categories
 *          description : returning all category including parent and childs
 *          tags : [CategoryRoutes]
 *          parameters : 
 *               -  in : header
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  requried : true
 *                  type : string
 *                  name : accesstoken
 *          responses :
 *              200 :    
 *                  description : Success
 *          
 */
router.get('/getall/', CategoryController.getAllCategory)

/**
 * @swagger
 *  /admin/category/getchilds/{parent}:
 *      post :
 *          summary : Get All childs
 *          description : get all childs of specefic parent
 *          tags : [CategoryRoutes]
 *          parameters :
 *              -   in : header
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  requried : true
 *                  type : string
 *                  name : accesstoken
 *              -   name : parent
 *                  in : path
 *                  type : string
 *                  description : parentID
 *                  required : true
 *          responses : 
 *              200 :
 *                  description : Success
 */
router.post('/getchilds/:parent' , CategoryController.getChildCategories)

/**
 * @swagger
 *  /admin/category/getbyid/{id}:
 *      get :
 *          summary : return specefic category
 *          description : using id as params to return specefic category by id
 *          tags : [CategoryRoutes]
 *          parameters :
 *              -   in : header
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  requried : true
 *                  type : string
 *                  name : accesstoken
 *              -   name : id
 *                  in : path
 *                  type : string
 *                  description : CategoryID
 *                  required : true
 *          responses : 
 *              200 :
 *                  description : Success
 */
router.get('/getbyid/:id' , CategoryController.getCategoryById)

/**
 * @swagger
 *  /admin/category/deletebyid/{id}:
 *      delete :
 *          summary : delete category
 *          description : delete specefic category using id that given as params
 *          tags : [CategoryRoutes]
 *          parameters :
 *              -   in : header
 *                  value : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxOTkyNzA5MSIsImlhdCI6MTY4MTgzNjgwNiwiZXhwIjoxNzEzMzk0NDA2fQ.iBNgVMWtt1KszG_0ZCgB6CQ0_Ne_pgUdTTm9S4oB2ZY
 *                  requried : true
 *                  type : string
 *                  name : accesstoken
 *              -   name : id
 *                  in : path
 *                  type : string
 *                  description : CategoryID
 *                  required : true
 *          responses : 
 *              200 :
 *                  description : Success
 */
router.delete('/deletebyid/:id' , CategoryController.removeCategoryByID)

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch : 
 *          summary : update category
 *          description : update specefic category by given id
 *          tags : [CategoryRoutes]
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *                  description : valid mongodb id
 *          requestBody :
 *              required : true 
 *              content : 
 *                  application/x-www-form-urlencoded : 
 *                      schema : 
 *                          $ref : "#/components/schemas/Category"
 *                  application/json : 
 *                      schema : 
 *                          $ref : "#/components/schemas/Category"
 *          responses : 
 *              200 : 
 *                  description : Success
 */
router.patch('/update/:id' , CategoryController.updateCategory)
module.exports = { 
    categoryRoutes : router
}