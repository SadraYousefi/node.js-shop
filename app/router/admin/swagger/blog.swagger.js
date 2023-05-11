/**
 * @swagger
 *  components : 
 *      schemas : 
 *          AddBlog : 
 *              type : object
 *              required : 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   image
 *              properties : 
 *                  title : 
 *                      type : string
 *                      description : Title of your blog
 *                  short_text : 
 *                      type : string
 *                      description : your post content summary
 *                  text : 
 *                      type : string
 *                      description : your post content 
 *                  category : 
 *                      type : string
 *                      description : objectid for category
 *                  tags : 
 *                      type : string
 *                      description : list of tags
 *                  image : 
 *                      type : file
 *                      description : an image for your post
 */


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

/**
 * @swagger
 *  /admin/blog/add : 
 *      post : 
 *          summary : Adding post
 *          description : get required data for adding post + examples
 *          tags : [BlogAdminRoutes]
 *          requestBody : 
 *              required : true 
 *              content : 
 *                  multipart/form-data : 
 *                      schema : 
 *                          $ref : "#/components/schemas/AddBlog"
 *          responses :
 *              201 :    
 *                  description : Created             
 */

/**
 * @swagger
 *  /admin/blog/getpost/{id}:
 *      get : 
 *          summary : get post by id
 *          tags : [BlogAdminRoutes]
 *          description : send valid mongodb
 *          parameters : 
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

/**
 * @swagger
 *  /admin/blog/{id} :
 *      delete : 
 *          summary : delete post by id
 *          tags : [BlogAdminRoutes]
 *          parameters : 
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