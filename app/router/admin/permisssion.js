const { PermissionController } = require('../../http/controllers/admin/RBAC/permission.controller');

const router = require('express').Router() ;

router.get("/list" , PermissionController.listOfPermissions) ;
router.post("/add" , PermissionController.createPermission) ;
router.delete("/:permissionID" , PermissionController.removePermission)
router.patch("/:permissionID" , PermissionController.updatePermission)

module.exports = {
    AdminPermissionRoutes : router
}