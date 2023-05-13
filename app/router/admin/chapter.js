const { ChapterController } = require('../../http/controllers/admin/chapter.controller')

const router = require('express').Router()

router.put("/add" , ChapterController.addChapter)
router.get("/:id" , ChapterController.getCourseChapters)

module.exports = {
    ChapterRoutes : router
}