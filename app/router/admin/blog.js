const { BlogAdminController } = require("../../http/controllers/admin/blog.controller")
const { stringToArray } = require("../../http/middleware/stringToArray")
const { uploadFile } = require("../../utlis/multer")
const router = require("express").Router()


router.get('/' , BlogAdminController.getAllPost)
router.post('/add' ,uploadFile.single("image"),stringToArray('tags') , BlogAdminController.createPost)
router.get('/getpost/:id' , BlogAdminController.getPostById)
router.delete("/:id" , BlogAdminController.deletePostById)
router.patch("/:id" , uploadFile.single('image'), stringToArray('tags') , BlogAdminController.editPostById)


module.exports = { 
    BlogAdminRoutes : router
}