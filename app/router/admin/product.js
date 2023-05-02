const { ProductController } = require('../../http/controllers/admin/product.controller');
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utlis/multer');

const router = require('express').Router();

/**
 * @swagger
 *  components : 
 *      schemas : 
 *          Product :
 *              type : object
 *              required : 
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   image
 *              properties :
 *                  title : 
 *                      type : string
 *                      description : the title of Product
 *                  text : 
 *                      type : string
 *                      description : Main Decription or product
 *                  short_text : 
 *                      type : string
 *                      description : short Description
 *                  tags : 
 *                      type : array
 *                      description : tags for products
 *                  category : 
 *                      type : string
 *                      description : an mongodb objectid for category
 *                  height : 
 *                      type : number
 *                      description : height of the product
 *                  weight : 
 *                      type : number
 *                      description : weight of the product
 *                  width : 
 *                      type : number
 *                      description : width of the product
 *                  length : 
 *                      type : number
 *                      description : lenght of the product
 *                  price : 
 *                      type : number
 *                      description : price for product
 *                  discount : 
 *                      type : number
 *                      description : discount code for product
 *                  count : 
 *                      type : number
 *                      description : the number of available for this products
 *                  image : 
 *                      type : file
 *                      description : image
 */

/**
 * @swagger
 *  /admin/products/add :
 *      post :
 *          summary : Route For creating product
 *          tags : [ProductAdminRoutes]
 *          requestBody :
 *              required : true
 *              content : 
 *                  multipart/form-data:
 *                      schema :
 *                          $ref : "#/components/schemas/Product"
 *          responses : 
 *              200 : 
 *                  description : Succcess
 */

router.post('/add' , uploadFile.single('image') ,stringToArray('tags'), ProductController.addProduct)

/**
 * @swagger
 *  /admin/products/:
 *      get : 
 *          summary : get all products 
 *          tags : [ProductAdminRoutes]
 *          responses : 
 *              200 :
 *                  description : success
 */
router.get("/" , ProductController.getAllProduct)
module.exports = { 
    adminApiProductRouter : router
}