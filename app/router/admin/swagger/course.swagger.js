
/**
 * @swagger
 *  components : 
 *      schemas : 
 *          TypesOfCourse :
 *              type : string
 *              enum : 
 *                  -   Free
 *                  -   Special
 *                  -   ForSale
 *          Course :
 *              type : object
 *              required : 
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties :
 *                  title : 
 *                      type : string
 *                      description : the title of Course
 *                  text : 
 *                      type : string
 *                      description : Main Decription or Course
 *                  short_text : 
 *                      type : string
 *                      description : short Description
 *                  tags : 
 *                      type : array
 *                      description : tags for Course
 *                  category : 
 *                      type : string
 *                      description : an mongodb objectid for category
 *                  price : 
 *                      type : number
 *                      description : price for Course
 *                  discount : 
 *                      type : number
 *                      description : discount code for Course
 *                  type : 
 *                      $ref : "#/components/schemas/TypesOfCourse"
 *                  image : 
 *                      type : string
 *                      format : binary
 */

/**
 * @swagger
 *  /admin/courses/list :
 *      get : 
 *          tags : [CourseAdminRoutes]
 *          summary : Get list of all submited course
 *          parameters : 
 *              -   in : query
 *                  name : search
 *                  type : string
 *                  description : This is Search for course in text title , short_Text
 *          responses : 
 *              200 : 
 *                  description : success 
 */

/**
 * @swagger
 *  /admin/courses/add :
 *      post :
 *          summary : Creating Course
 *          tags : [CourseAdminRoutes]
 *          requestBody :
 *              required : true
 *              content : 
 *                  multipart/form-data:
 *                      schema :
 *                          $ref : "#/components/schemas/Course"
 *          responses : 
 *              200 : 
 *                  description : New Course Created
 */


/**
 * @swagger
 *  /admin/courses/{id} :
 *      get : 
 *          tags : [CourseAdminRoutes]
 *          summary : Get single course by id
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  description : id for course
 *          responses : 
 *              200 : 
 *                  description : success 
 */
