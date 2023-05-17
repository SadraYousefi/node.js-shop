/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 645cccd32a409a8f568b4339 
 *                  chapterID:
 *                      type: string
 *                      example: 645fc7ba16c75b7f15de9509
 *                  title:
 *                      type: string
 *                      description: title for episode
 *                  text:
 *                      type: string
 *                      description: text for episode
 *                  type:
 *                      type: string
 *                      description: free , cash 
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: file of video
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for episode
 *                  text:
 *                      type: string
 *                      description: text for episode
 *                  type:
 *                      type: string
 *                      description: free , cash 
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: file of video
 *                      format: binary
 */

/**
 * @swagger
 *  /admin/episodes/add:
 *      put:
 *          summary: add Episode to course
 *          tags: [EpisodeAdminRoutes]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddEpisode"
 *          responses:
 *              200 :
 *                  description : success
 */
/**
 * @swagger
 *  /admin/episodes/{episodeID}:
 *      patch:
 *          summary: edit Episode
 *          tags: [EpisodeAdminRoutes]
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *                  example: 64632ab14d45765be4956e9d 
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/EditEpisode"
 *          responses:
 *              200 :
 *                  description : success
 */
/**
 * @swagger
 *  /admin/episodes/{episodeID}:
 *      delete:
 *          summary: delete Episode from the course
 *          tags: [EpisodeAdminRoutes]
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              200 :
 *                  description : success
 */

