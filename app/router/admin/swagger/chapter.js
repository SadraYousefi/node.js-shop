/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      description: hey
 *                  title:
 *                      type: string
 *                      description: hey
 *                  text:
 *                      type: string
 *                      description: hey
 *          EditChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: hey
 *                  text:
 *                      type: string
 *                      description: hey
 */

/**
 * @swagger
 *  definitions:
 *      AddChapter:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      msg : 
 *                          type: string
 *                          example: "successfully created"
 *      ChapterList:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: "Course title"
 *                              id:
 *                                  type: string
 *                                  example: "645d0e3a29fa59c724b58ce7"
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *      UpdateChapter:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      msg:
 *                          type: string
 */

/**
 * @swagger
 *  /admin/chapters/add:
 *      put:
 *          summary: add chapter to course
 *          tags: [ChapterAdminRoutes]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"
 *          responses:
 *              200 :
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/AddChapter"
 */
/**
 * @swagger
 *  /admin/chapters/{id}:
 *      get:
 *          summary: get all chapters of course
 *          tags: [ChapterAdminRoutes]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  example: 645d0e3a29fa59c724b58ce7
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ChapterList"
 */
/**
 * @swagger
 *  /admin/chapters/{id}:
 *      delete:
 *          summary: remove chapter by id
 *          tags: [ChapterAdminRoutes]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  example: 645f5555a214db3f1ea0fe23
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ChapterList"
 */

/**
 * @swagger
 *  /admin/chapters/{chapterID}:
 *      patch:
 *          summary: edit chapter
 *          tags: [ChapterAdminRoutes]
 *          parameters: 
 *              -   in: path
 *                  name: chapterID
 *                  required: true
 *                  example: 645fa8bb3ea7df26260bb605
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/EditChapter"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/EditChapter"
 *          responses:
 *              200 :
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/UpdateChapter"
 */