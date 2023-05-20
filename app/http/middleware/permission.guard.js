const createHttpError = require("http-errors");
const { PermissionModel } = require("../../models/permissions");
const { RoleModel } = require("../../models/role");
const { PERMISSIONS } = require("../../utlis/constant");

function checkPermission(requiredPermissions = []) {
    return async function (req, res, next) {
      try {
        const user = req.user;
        const role = await RoleModel.findOne({title: user.Role})
        const permissions = await PermissionModel.find({_id : {$in: role.permissions}})
        const userPermissions = permissions.map(item => item.title)
        if(userPermissions.includes(PERMISSIONS.SUPER_ADMIN)) return next()
        const hasPermission = requiredPermissions.every(permission => {
          return userPermissions.includes(permission)
        })
        if(!requiredPermissions || hasPermission) return next();
        throw createHttpError.Forbidden("you don't have access to this part");
      } catch (error) {
        next(error)
      }
    };
  }

  module.exports = { 
    checkPermission
  }