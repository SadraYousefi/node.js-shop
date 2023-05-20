const { AdminUserController } = require("../../http/controllers/admin/users/user.controller");

const router = require("express").Router() ;

router.get('/list' , AdminUserController.getAllUsers)
router.patch('/:userID' , AdminUserController.updateUserProfile)
router.get("/profile" , AdminUserController.userProfile)

module.exports = { 
    UserAdminRoutes : router
}