const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post :
 *          summary : Creating category
 *          description : creating category using title and parent objectID
 *          tags: [Admin-Routes]
 *          parameters : 
 *              - name : title
 *                description : enter title for category
 *                in : formData
 *                type : string
 *                required : true
 *              - name : parent
 *                description : parent id for title
 *                in : formData
 *                type : string
 *          responses : 
 *              200:
 *                  description : success
 */
router.route("/add").post(CategoryController.addCategory)

/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags : [Admin-Routes]
 *      summary : Getting all parent of categories
 *      description : only get parents
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
 *          tags : [Admin-Routes]
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
 *          tags : [Admin-Routes]
 *          parameters :
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
 *          tags : [Admin-Routes]
 *          parameters :
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
 *          tags : [Admin-Routes]
 *          parameters :
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
 *          tags : [Admin-Routes]
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *                  description : valid mongodb id
 *              -   in : formData
 *                  name : title
 *                  type : string
 *                  required : true
 *                  description : new title for category
 *          responses : 
 *              200 : 
 *                  description : Success
 */
router.patch('/update/:id' , CategoryController.updateCategory)
module.exports = { 
    categoryRoutes : router
}