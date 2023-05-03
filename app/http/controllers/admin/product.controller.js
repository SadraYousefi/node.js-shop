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
const { idValidator } = require("../../validators/public.validator");

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
  async removeProduct(req, res, next) {
    try {
      const {id} = req?.params || null
      const product = await this.findProduct(id)
      const result = await ProductModel.deleteOne({_id : product._id})
      if(result.deletedCount == 0) throw createHttpError.InternalServerError("product Didn't deleted")
      res.status(200).json({
        data : {
          statusCode : 200 , 
          msg : "Product deleted successfully !"
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const search = req?.query?.search || ""
      if(!search) return res.status(200).json({data : {statusCode : 200 , msg : await ProductModel.find({})}})
      const products = await ProductModel.find({
        $text : {
          $search : search
        }
      })
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
  async findProductByID(req, res, next) {
    const {id} = req?.params
    const product = await this.findProduct(id)
    res.status(201).json({
      data : {
        statusCode : 201 ,
        product
      }
    })
    try {
    } catch (error) {
      next(error);
    }
  }
  async findProduct(productID) { 
    await idValidator.validateAsync({id : productID}) ;
    const product = await ProductModel.findById({_id : productID}) ;
    if(!product) throw createHttpError.NotFound('Product did not founded')
    return product
  }
}

module.exports = {
  ProductController: new ProductController(),
};
