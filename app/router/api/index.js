const homeController = require('../../http/controllers/api/home.controller')

const router = require('express').Router()
router.route("/").post(homeController.indexPage);

module.exports = { 
    APIRoutes : router
}