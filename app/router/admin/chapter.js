const { ChapterController } = require('../../http/controllers/admin/chapter.controller')

const router = require('express').Router()

router.put("/add" , ChapterController.addChapter)
router.get("/:id" , ChapterController.getCourseChapters)
router.delete("/:id" , ChapterController.deleteChapter)
router.patch('/:chapterID' , ChapterController.updateChapter)

module.exports = {
    ChapterRoutes : router
}