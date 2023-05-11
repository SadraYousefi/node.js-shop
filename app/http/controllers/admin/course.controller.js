const httpStatus = require("http-status");
const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const {
  databasePathMaker,
  deletePublicImage,
} = require("../../../utlis/functions");
const {
  createCourseValidation,
} = require("../../validators/admin/course.shcema");
const createHttpError = require("http-errors");
const { idValidator } = require("../../validators/public.validator");

class CourseController extends Controller {
  async getListOfCourses(req, res, next) {
    try {
      let course;
      const { search } = req.query;
      if (search)
        course = await CourseModel.find({ $text: { $search: search } }).sort({
          _id: -1,
        });
      else course = await CourseModel.find({}).sort({ _id: -1 });
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
        time : "00:00:00" ,
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
    await idValidator.validateAsync(req.params)
    const {id} = req.params
    const course = await CourseModel.findById({_id : id})
    if(!course) throw createHttpError.NotFound("No Course Founded")
    return res.status(httpStatus.OK).json({
        data :{
            statusCode : httpStatus.OK , 
            course
        }
    })
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  CourseController: new CourseController(),
};
