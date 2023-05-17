const { EpisodeController } = require('../../http/controllers/admin/episode.controller')
const { uploadVideo } = require('../../utlis/multer')

const router = require('express').Router()

router.put('/add' ,uploadVideo.single("video"), EpisodeController.addEpisode)
router.delete('/:episodeID' , EpisodeController.deleteEpisode)
router.patch("/:episodeID" ,uploadVideo.single("video"), EpisodeController.updateEpisode)

module.exports = { 
    EpisodeRoutes : router
}