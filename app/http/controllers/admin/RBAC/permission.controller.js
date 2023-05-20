const httpStatus = require("http-status");
const { PermissionModel } = require("../../../../models/permissions");
const Controller = require("../../controller");
const {
  addPermissionsSchema,
} = require("../../../validators/admin/rbac.schema");
const createHttpError = require("http-errors");
const { deleteInvalidObjectData } = require("../../../../utlis/functions");

class PermissionController extends Controller {
  async listOfPermissions(req, res, next) {
    try {
      const permissions = await PermissionModel.find({});
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          permissions,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async createPermission(req, res, next) {
    try {
      const { title, description } = await addPermissionsSchema.validateAsync(
        req.body
      );
      await this.findPermissionByTitle(title);
      const permission = await PermissionModel.create({ title, description });
      if (!permission)
        throw new createHttpError.InternalServerError(
          "Permission was not created successfully"
        );
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          msg: "Permission created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removePermission(req, res, next) {
    try {
      const { permissionID } = req.params;
      await this.findPermissionById(permissionID);
      const deletedPermission = await PermissionModel.deleteOne({
        _id: permissionID,
      });
      if (!deletedPermission.deletedCount)
        throw new createHttpError.InternalServerError(
          "deleting permission wasn't successfull"
        );
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          msg: "Permission deleted successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updatePermission(req, res, next) {
    try {
      const { permissionID } = req.params;
      await this.findPermissionById(permissionID);
      const data = req.body;
      deleteInvalidObjectData(data, ["title", "description"]);
      await this.findPermissionByTitle(data.title);
      const updatedPermission = await PermissionModel.updateOne(
        { _id: permissionID },
        { $set: data }
      );
      if (!updatedPermission.modifiedCount)
        throw new createHttpError.InternalServerError(
          "update was not successfull"
        );
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          msg: "Update was successfull",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findPermissionByTitle(title) {
    const permission = await PermissionModel.findOne({ title });
    if (permission)
      throw new createHttpError.BadRequest(
        "This permission was added before choose another name"
      );
  }
  async findPermissionById(permissionID) {
    const permission = await PermissionModel.findById({ _id: permissionID });
    if (!permission)
      throw new createHttpError.BadRequest("permission didn't founded");
    return permission;
  }
}
module.exports = {
  PermissionController: new PermissionController(),
};
