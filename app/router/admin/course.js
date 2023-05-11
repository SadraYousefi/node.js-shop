const { CourseController } = require('../../http/controllers/admin/course.controller');
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utlis/multer');

const router = require('express').Router() ;

router.get("/list" , CourseController.getListOfCourses)
router.post("/add" , uploadFile.single("image") , stringToArray("tags") , CourseController.addCourse)
router.get("/:id" , CourseController.getCourseByID)

module.exports = {
    AdminCourseRoutes : router
}