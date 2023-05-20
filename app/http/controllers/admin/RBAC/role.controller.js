const httpStatus = require("http-status");
const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const { json } = require("express");
const createHttpError = require("http-errors");
const { createRoleSchema } = require("../../../validators/admin/rbac.schema");
const {default: mongoose } = require("mongoose");
const { idValidator } = require("../../../validators/public.validator");
const { deleteInvalidObjectData } = require("../../../../utlis/functions");

class RoleController extends Controller {
  async listOfAllRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({}).populate({path: "permissions"});
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          roles,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async createRole(req , res , next) {
    try {
        const {title , permissions}  = await createRoleSchema.validateAsync(req.body)
        await this.findRoleWithTitle(title)      
        const role = await RoleModel.create({title , permissions})
        if(!role) throw new createHttpError.InternalServerError("Role didn't created successfully")
        res.status(httpStatus.CREATED).json({
            statusCode: httpStatus.CREATED ,
            data: {
                msg: "Role Created successfully"
            }
        })
    } catch (error) {
        next(error)
    }
  }
  async removeRole(req , res , next) { 
    const {field} = req.params
    const role = await this.findRole(field)
    const removeRoleResult = await RoleModel.deleteOne({_id : role._id})
    if(!removeRoleResult.deletedCount) throw new createHttpError.InternalServerError("deleting role was not successfull")
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK ,
      data: {
        msg: "role deleted successfully"
      }
    })
  }
  async updateRole(req , res , next) {
    try {
      const {roleID} = req.params ;
      await idValidator.validateAsync({id : roleID})
      await this.findRoleWithTitle(roleID)
      const data = req.body ;
      deleteInvalidObjectData(data , ['title' , 'permissions'])
      if(data.title) await this.findRoleWithTitle(data.title)
      const updatedRole = await RoleModel.updateOne({_id:roleID} , {$set : data})
      if(!updatedRole.modifiedCount) throw new createHttpError.InternalServerError("Update was not successfull")
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK ,
        data: {
          msg: "updated successfully"
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async findRoleWithTitle(title) {
    if(await RoleModel.findOne({title}))
        throw new createHttpError.BadRequest("Role is already exist") 
  }
  async findRole(query) {
    let findQuery = mongoose.isValidObjectId(query) ? {_id : query} : {title:query}
    let role = await RoleModel.findOne(findQuery)
    if(!role) throw new createHttpError.BadRequest("Role not found")
    return role
  }
}
module.exports = {
  RoleController: new RoleController(),
};
