const homeController = require('../../http/controllers/api/home.controller')

const router = require('express').Router()
router.route("/").get(homeController.indexPage);

module.exports = { 
    APIRoutes : router
}