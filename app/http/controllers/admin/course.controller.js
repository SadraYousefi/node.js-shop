const httpStatus = require("http-status");
const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const {
  databasePathMaker,
  deletePublicImage,
  deleteInvalidObjectData,
  getCourseTime,
} = require("../../../utlis/functions");
const {
  createCourseValidation,
} = require("../../validators/admin/course.shcema");
const createHttpError = require("http-errors");
const { idValidator } = require("../../validators/public.validator");
const { default: mongoose } = require("mongoose");

class CourseController extends Controller {
  async getListOfCourses(req, res, next) {
    try {
      let course;
      const { search } = req.query;
      if (search)
        course = await CourseModel.find({ $text: { $search: search } }).sort({
          _id: -1,
        });
      else {
        course = await CourseModel.aggregate([
          {$match :{}} ,
          {$lookup : {from : "categories" , localField: "category" , foreignField : "_id" , as : "category" }} ,
          {$lookup : {from : "users" , localField : "teacher" , foreignField : "_id" , as : "teacher"}} ,
          {$project : {"teacher._id" : 0 , "teacher.mobile" : 0 , "teacher.otp" : 0 ,"teacher.bills" : 0 ,"teacher.roles" : 0 , "teacher.discount" : 0 , "category.__v" : 0 , "teacher.__v" : 0 }}
        ])
      }
      res.status(httpStatus.OK).json({
        data: {
          statusCode: httpStatus.OK,
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async addCourse(req, res, next) {
    try {
      const { fileUploadPath, filename } = req.body;
      const image = databasePathMaker(fileUploadPath, filename);
      req.image = image;
      await createCourseValidation.validateAsync(req.body);
      const { title, short_text, text, tags, category, price, discount, type } =
        req.body;
      const teacher = req.user._id  
      if(Number(price) > 0 && type == "Free") throw createHttpError.BadRequest("Can't Set price for free course") 
      const course = await CourseModel.create({
        title,
        short_text,
        text,
        tags,
        category,
        price,
        discount,
        type,
        image,
        status : "notStarted",
        teacher
      });
      if(!course) throw createHttpError.InternalServerError("User didn't created")
      res.status(httpStatus.CREATED).json({
        data : { 
            statusCode : httpStatus.CREATED ,
            msg : "Course created successfully"
        }
      })
    } catch (error) {
      deletePublicImage(req.image);
      next(error);
    }
  }
  async getCourseByID(req, res, next) {
    try {
      const {id} = req.params
      await idValidator.validateAsync({id})
      const course = await this.findCourseById(id)
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK , 
        data :{
              course
          }
      })
    } catch (error) {
      next(error);
    }
  }
  async updateCourse(req,res,next) {
    try {
      const {courseID}= req.params
      const {fileUploadPath , filename} = req.body
      const image = databasePathMaker(fileUploadPath , filename)
      req.image = image
      await idValidator.validateAsync({id: courseID})
      const course = await this.findCourseById(courseID)
      const data = req.body
      let allowedList = [
        "title",
        "short_text",
        "text",
        "tags",
        "category",
        "price",
        "discount",
        "type",
        "image",
        "status" ,
      ]
      deleteInvalidObjectData(data , allowedList)
      if(req.file) { 
        data.image = req.image ;
        deletePublicImage(course.image)
      }
      const updateCourse = await CourseModel.updateOne({_id: courseID} , {$set : data} )
      if(!updateCourse.modifiedCount) throw createHttpError.InternalServerError("Update was not successfull")
      res.status(httpStatus.OK).json({
        data: {
          msg: "Updated Successfully"
        }
      })

    } catch (error) {
      deletePublicImage(req.image)
      next(error)
    }
  }
  async findCourseById(id) { 
    const course = await CourseModel.findById({_id : id})
    if(!course) throw createHttpError.NotFound("There is no course with this id")
    return course ;
  }
}
module.exports = {
  CourseController: new CourseController(),
};
