const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/products");
const { UserModel } = require("../../../models/user");
const {
  databasePathMaker,
  deletePublicImage,
} = require("../../../utlis/functions");
const {
  createProductValidation,
} = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      await createProductValidation.validateAsync(req.body);
      const user = await UserModel.findById({ _id: req.user._id });
      const {
        count,
        title,
        discount,
        text,
        short_text,
        length,
        height,
        weight,
        width,
        tags,
        category,
      } = req.body;
      const result = await ProductModel.create({
        count,
        title,
        discount,
        text,
        short_text,
        features: { length, height, weight, width },
        tags,
        category,
        image : req.images,
        supplier: req.user._id,
      });
      if (!result)
        throw new createHttpError.InternalServerError(
          "Product did not created successfully"
        );
      return res.status(201).json({
        data: {
          statusCode: 201,
          msg: "product created successfully",
        },
      });
    } catch (error) {
      deletePublicImage(req.images);
      next(error);
    }
  }
  updateProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const products = await ProductModel.aggregate([
        {
          $match : {}
        } ,
        {
          $lookup : {
            from : "users" ,
            localField : "supplier" ,
            foreignField : "_id" ,
            as : "supplier"
          }
        },
        {
          $lookup : {
            from : "categories" ,
            localField : "category" ,
            foreignField : "_id" ,
            as : "category"
          }
        } ,
        {
          $project : {
            "supplier.__v" : 0,
            "supplier.otp" : 0,
            "supplier._roles" : 0,
            "supplier._bills" : 0,
            "category.__v" : 0,
          }
        }
      ])
      if(!products) throw createHttpError.NotFound('didnt found any record')
      res.status(200).json({
        data : {
          statusCode : 200 ,
          products
        }
      })
    } catch (error) {
      next(error);
    }
  }
  getProductByID(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProductController: new ProductController(),
};
