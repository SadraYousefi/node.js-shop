const createHttpError = require("http-errors");
const { CourseController } = require("./course.controller");
const { default: mongoose } = require("mongoose");
const httpStatus = require("http-status");
const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const { deleteInvalidObjectData } = require("../../../utlis/functions");

class ChapterController extends Controller {
  async addChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      if (!mongoose.isValidObjectId(id))
        throw createHttpError.BadRequest("Id is not valid");
      await CourseController.findCourseById(id);
      const chapter = await CourseModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: {
              title,
              text,
              episodes: [],
            },
          },
        }
      );
      if (chapter.modifiedCount == 0)
        throw createHttpError.InternalServerError("chapter didn't added");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          msg: "Chapter Created Successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCourseChapters(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id))
        throw createHttpError.BadRequest("Id is not valid");
      const course = await this.getChaptersOfCourse(id);
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteChapter(req, res, next) {
    try {
      const { id } = req.params;
      await this.getSingleChapterById(id);
      const deletedChapter = await CourseModel.updateOne({"chapters._id" : id},  {$pull : {chapters:{_id : id}}})
      if(deletedChapter.modifiedCount == 0) throw createHttpError.InternalServerError("chapter has not been deleted")
      res.status(httpStatus.OK).json({
        statusCode:httpStatus.Ok ,
        data: {
            msg: "chapter has been deleted successfully"
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async updateChapter(req , res , next) { 
    try {
        const{chapterID} = req.params
        await this.getSingleChapterById(chapterID)
        const data = deleteInvalidObjectData(req.body , ["title" , "text"])
        const updateResult = await CourseModel.updateOne(
            {"chapters._id" : chapterID } , 
            {$set : {"chapters.$" : data}}
        )
        if(updateResult.modifiedCount == 0 ) throw createHttpError.InternalServerError("update was not successfull")
        res.status(httpStatus.OK).json({
            statusCode : httpStatus.OK , 
            data : {
                msg: "updated Successfully"
            }
        })
    } catch (error) {
        next(error)
    }
  }
  async getChaptersOfCourse(id) {
    const chapters = await CourseModel.findById(
      { _id: id },
      { chapters: 1, title: 1 }
    );
    if (!chapters) throw createHttpError.NotFound("no chapter has been found");
    return chapters;
  }
  async getSingleChapterById(chapterId) {
    const chapter = await CourseModel.findOne(
      { "chapters._id": chapterId },
      { "chapters.$": 1 }
    );
    if (!chapter) throw createHttpError.NotFound("Chapter dosen't exist");
    return chapter;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
