const { BlogModel } = require('../../../models/blog')
const { createPostValidation } = require('../../validators/admin/blog.schema')
const path = require('path')
const Controller = require('./../controller')
const { deletePublicImage } = require('../../../utlis/functions')
const { log } = require('console')
class BlogAdminController extends Controller {
    async createPost(req , res , next) { 
        try {
            await createPostValidation.validateAsync(req.body)
            let image = path.join(req.body.fileUploadPath , req.body.filename)
            image = image.replace(/\\/g , "/")
            req.body.image = image ;
            const {title , short_text , category , tags , text} = req.body
            const post = await BlogModel.create({title , short_text , image , category , tags , text})
            res.status(200).json({
                data
            })
            
        } catch (error) {
            deletePublicImage(req.body.image)
            next(error)
        }
    }
    deletePostById(req , res , next) { 
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getPostById(req , res , next) { 
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getAllPost(req , res , next) { 
        try {
            const posts = await BlogModel.find({})
            return res.status(200).json({
                data : {
                    statusCode : 200 , 
                    posts
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    getBlogComments(req , res , next) { 
        try {
            
        } catch (error) {
            next(error)
        }
    }
    editPostById(req , res , next) { 
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports  =  { 
    BlogAdminController : new BlogAdminController
}