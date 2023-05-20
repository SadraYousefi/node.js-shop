/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for the permission
 *                  description:
 *                      type: string
 *                      description : description for permission
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for the rpermission
 *                  description:
 *                      type: string
 *                      description : a description for permissions
*/
/**
 * @swagger
 *  /admin/permissions/list:
 *      get:
 *          tags: [RBACAdminPanel]
 *          summary: list of all permission in system
 *          
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/permissions/add:
 *      post:
 *          tags: [RBACAdminPanel]
 *          summary: adding permission to rbac system
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Permission"
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/permissions/{permissionID}:
 *      patch:
 *          tags: [RBACAdminPanel]
 *          summary: editing permission to rbac system
 *          parameters:
 *              -   in: path
 *                  name: permissionID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Edit-Permission"
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/permissions/{permissionID}:
 *      delete:
 *          tags: [RBACAdminPanel]
 *          summary: delete permission
 *          parameters:
 *              -   in: path
 *                  name: permissionID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */