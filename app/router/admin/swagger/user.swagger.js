/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: your firstname
 *                      example: sadra
 *                  last_name:
 *                      type: string
 *                      description: your lastname
 *                      example: yousefi
 *                  username:
 *                      type: string
 *                      description: your username
 *                      example: sadrayousefi
 *                  email:
 *                      type: string
 *                      description: your firstname
 *                      example: sadra.mty@gmail.com
 */

/**
 * @swagger
 *  /admin/users/list :
 *      get : 
 *          tags : [UsersAdminPanel]
 *          summary : Get list of all users
 *          parameters : 
 *              -   in : query
 *                  name : search
 *                  type : string
 *                  description : This is Search for name in first_name , last_name , mobile , email , username
 *          responses : 
 *              200 : 
 *                  description : success 
 *                  content : 
 *                      application/json:
 *                          schema:
 *                              $ref : '#/definitions/ListOfCourses'
 */
/**
 * @swagger
 *  /admin/users/{userID} :
 *      patch: 
 *          tags: [UsersAdminPanel]
 *          summary: update user
 *          parameters : 
 *              -   in : path
 *                  name : userID
 *                  type : string
 *                  description : the user id which you want to modify
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Update-Profile"
 *          responses : 
 *              200 : 
 *                  description : success 
 *                  content : 
 *                      application/json:
 *                          schema:
 *                              $ref : '#/definitions/ListOfCourses'
 */

/**
 * @swagger
 *  /admin/users/profile :
 *      get : 
 *          tags : [UsersAdminPanel]
 *          summary : Get user profile
 *          responses : 
 *              200 : 
 *                  description : success 
 */