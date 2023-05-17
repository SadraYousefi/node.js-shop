const httpStatus = require("http-status");
const { CourseModel } = require("../../../models/course");
const {
  databasePathMaker,
  convertVideoTimeFormat,
  deletePublicImage,
  deleteInvalidObjectData,
} = require("../../../utlis/functions");
const {
  createEpisodeValidation,
} = require("../../validators/admin/course.shcema");
const Controller = require("../controller");
const { getDuration } = require("get-media-duration");
const path = require("path");
const createHttpError = require("http-errors");
const { idValidator } = require("../../validators/public.validator");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

class EpisodeController extends Controller {
  async addEpisode(req, res, next) {
    try {
      const { filename, fileUploadPath } = req.body;
      const videoAddress = databasePathMaker(fileUploadPath, filename);
      const videoUrl = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`;
      req.video = videoAddress;
      const { title, text, type, chapterID, courseID } =
        await createEpisodeValidation.validateAsync(req.body);
      const videoTime = await getDuration(videoUrl);
      const convertedTime = convertVideoTimeFormat(videoTime);
      const createEpisodeResult = await CourseModel.updateOne(
        { _id: courseID, "chapters._id": chapterID },
        {
          $push: {
            "chapters.$.episodes": {
              title,
              text,
              type,
              time: convertedTime,
              videoAddress,
            },
          },
        }
      );
      if (createEpisodeResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "Adding episode was not successful"
        );
      res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          msg: "Episode Created Successfully",
        },
      });
    } catch (error) {
      deletePublicImage(req.video);
      next(error);
    }
  }
  async updateEpisode(req, res, next) {
    try {
      let allowedFields = ['title' , 'text' , 'type' , 'video']
      const {episodeID} = req.params
      await idValidator.validateAsync({id: episodeID })
      const { filename, fileUploadPath } = req.body;
      if(filename && fileUploadPath) {
        const videoAddress = databasePathMaker(fileUploadPath, filename);
        const videoUrl = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`;
        req.body.video = videoAddress;
        const videoTime = await getDuration(videoUrl);
        req.body.time = convertVideoTimeFormat(videoTime);
      } else {
        allowedFields.pop('video')
      }
      const data = deleteInvalidObjectData(req.body , allowedFields)
      const episode = await this.getSingleEpisode(episodeID , data)
      console.log(episode);
      const updateEpisodeResult = await CourseModel.updateOne(
        {"chapters.episodes._id" : episodeID},
        {
          $set: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (!updateEpisodeResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "updating episode was not successful"
        );
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          msg: "Episode updated Successfully",
        },
      });
    } catch (error) {
      if(req.body.video) deletePublicImage(req.body.video);
      next(error);
    }
  }
  async deleteEpisode(req, res, next) {
    try {
      const { episodeID } = req.params;
      await idValidator.validateAsync({id:episodeID});
      const deletedEpisode = await CourseModel.updateOne(
        { "chapters.episodes._id": episodeID },
        {
          $pull: { "chapters.$.episodes": { _id: episodeID } },
        }
      );
      if(deletedEpisode.matchedCount == 0) throw createHttpError.NotFound('No episode has been found by this id')
      if (deletedEpisode.modifiedCount == 0)
        throw createHttpError.InternalServerError("Episode hasn't removed");
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          msg: "episode deleted successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  EpisodeController: new EpisodeController(),
};
