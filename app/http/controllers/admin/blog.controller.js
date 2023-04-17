const { BlogModel } = require('../../../models/blog')
const Controller = require('./../controller')
class BlogAdminController extends Controller {
    createPost(req , res , next) { 
        try {
            
            
        } catch (error) {
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