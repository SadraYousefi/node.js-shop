const { ProductController } = require('../../http/controllers/admin/product.controller');
const { filestoArray } = require('../../http/middleware/filesToArray');
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utlis/multer');

const router = require('express').Router();

router.post('/add' , uploadFile.array('image', 5), filestoArray ,stringToArray('tags'), ProductController.addProduct)
router.get("/" , ProductController.getAllProduct)
router.get("/:id" , ProductController.findProductByID)
router.delete("/:id" , ProductController.removeProduct)
router.patch("/:id" , uploadFile.array('image', 5), filestoArray ,stringToArray('tags'), ProductController.updateProduct)



module.exports = { 
    adminApiProductRouter : router
}