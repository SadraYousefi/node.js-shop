const Controller = require("./../controller");
const { CategoryModel } = require("./../../../models/category");
const createHttpError = require("http-errors");
const {
  createCategorySchema, validId, updateCategorySchema,
} = require("../../validators/admin/category.schema");
const { default: mongoose } = require("mongoose");
class CategoryController extends Controller {

  async addCategory(req, res, next) {
    try {
      await createCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category)
        throw createHttpError.InternalServerError(
          "Category did not created , Internal Server error"
        );
      return res.status(201).json({
        data: {
          statusCode: 201,
          msg: "Successfully created category",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCategoryByID(req, res, next) {
    try {
        const {id} = req.params
        const category = await this.checkExistCategory(id)
        const deleteResult = await CategoryModel.deleteOne({$or : [
            {_id : category._id} , 
            {parent : category._id},
        ]})
        if(deleteResult.deletedCount ==0) throw createHttpError.InternalServerError("Item has not been deleted")
        res.status(200).json({
            data : {
                statusCode : 200 ,
                message : "Delete was successful"
            }
        })
    } catch (error) {
      next(error);
    }
  }
  async updateCategory(req, res, next) {
    try {
        const {id} = req.params;
        const category = await this.checkExistCategory(id)
        await updateCategorySchema.validateAsync(req.body)
        const {title} = req.body ;
        const updatedCategory = await CategoryModel.updateOne({_id : id} , {$set : {title}})
        if(updatedCategory.modifiedCount == 0) throw createHttpError.InternalServerError('update was not successful')
        res.status(201).json({
            data : {
                statusCode : 201 ,
                msg : "Successfully updated"
            }
        })
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
        const categories = await CategoryModel.find({parent : undefined})
        console.log(categories);
        res.status(200).json({
            data : {
                statusCode : 200 ,
                categories
            }
        })
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
        const {id : _id} = req.params ;
        const categories = await CategoryModel.findOne({_id})
        res.status(201).json({
            data : {
                statusCode :201 , 
                categories
            }
        })
        
    } catch (error) {
      next(error);
    }
  }
  async checkExistCategory(id) { 
    const category = await CategoryModel.findById({_id : id})
    if(!category) throw new Error("didnt found any matching category")
    return category
  }
  async getParentsCategories(req, res, next) {
    try {
        const parents = await CategoryModel.find({parent:undefined})
        return res.status(200).json({
            data : {
                statusCode : 200 ,
                ParentCategories : parents
            }
        })
    } catch (error) {
      next(error);
    }
  }
  async getChildCategories(req, res, next) {
    try {
        const {parent} = req.params;
        const childs = await CategoryModel.find({parent} , {__v  : 0 , parent : 0})
        return res.status(200).json({
            data : { 
                statusCode : 200 ,
                childs
            }
        })
        
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CategoryController : new CategoryController(),
};
