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
 *                      type : array
 *                      items : 
 *                          type : string
 *                          format : binary
 *                      description : image
 *          Edit-Product :
 *              type : object
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
 *                      type : array
 *                      items : 
 *                          type : string
 *                          format : binary
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

/**
 * @swagger
 *  /admin/products/:
 *      get : 
 *          summary : get all products 
 *          tags : [ProductAdminRoutes]
 *          parameters : 
 *              -   in : query
 *                  name : text
 *                  description : Search for text in filds of Text , short_text , title or Products
 *          responses : 
 *              200 :
 *                  description : success
 */

/**
 * @swagger
 *  /admin/products/{id} : 
 *      get : 
 *          summary : finding product by id
 *          tags : [ProductAdminRoutes]
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *          responses : 
 *              200 : 
 *                  description : success 
 */

/**
 * @swagger
 *  /admin/products/{id} : 
 *      delete : 
 *          summary : finding product by id
 *          tags : [ProductAdminRoutes]
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *          responses : 
 *              200 : 
 *                  description : success 
 */

/**
 * @swagger
 *  /admin/products/{id} :
 *      patch :
 *          summary : Route For updating product
 *          tags : [ProductAdminRoutes]
 *          parameters : 
 *              -   in : path
 *                  type : string
 *                  required : true
 *                  description : id for post to update !
 *                  name : id
 *          requestBody :
 *              required : true
 *              content : 
 *                  multipart/form-data:
 *                      schema :
 *                          $ref : "#/components/schemas/Edit-Product"
 *          responses : 
 *              200 : 
 *                  description : Succcess
 */
