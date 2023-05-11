const { CategoryController } = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();


router.route("/add").post(CategoryController.addCategory)
router.get('/parents' ,CategoryController.getParentsCategories )
router.get('/getall/', CategoryController.getAllCategory)
router.post('/getchilds/:parent' , CategoryController.getChildCategories)
router.get('/getbyid/:id' , CategoryController.getCategoryById)
router.delete('/deletebyid/:id' , CategoryController.removeCategoryByID)
router.patch('/update/:id' , CategoryController.updateCategory)

module.exports = { 
    categoryRoutes : router
}