const { RoleController } = require('../../http/controllers/admin/RBAC/role.controller');
const { stringToArray } = require('../../http/middleware/stringToArray');

const router = require('express').Router() ;

router.get("/list" , RoleController.listOfAllRoles)
router.post("/add" , stringToArray('permissions') , RoleController.createRole)
router.delete("/:field" , RoleController.removeRole)
router.patch("/:roleID" ,stringToArray('permissions'), RoleController.updateRole)
module.exports = {
    AdminRoleRoutes : router
}