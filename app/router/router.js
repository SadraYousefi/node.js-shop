const { APIRoutes } = require("./api");

const router = require("express").Router() ;

router.use('/' , APIRoutes)
module.exports = { 
    allRoutes : router
}