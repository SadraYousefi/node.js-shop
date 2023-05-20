/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for the role
 *                  permissions:
 *                      type: array
 *                      description : an array of permissions for this role 
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for the role
 *                  permissions:
 *                      type: array
 *                      description : an array of permissions for this role 
*/
/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [RBACAdminPanel]
 *          summary: list of all roles in system
 *          
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBACAdminPanel]
 *          summary: adding role to rbac system
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Role"
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/role/{roleID}:
 *      patch:
 *          tags: [RBACAdminPanel]
 *          summary: editing role to rbac system
 *          parameters:
 *              -   in: path
 *                  name: roleID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Edit-Role"
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/role/{field}:
 *      delete:
 *          tags: [RBACAdminPanel]
 *          summary: delete role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */