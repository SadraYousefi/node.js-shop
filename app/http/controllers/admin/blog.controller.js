const { BlogModel } = require('../../../models/blog')
const { createPostValidation , idValidation } = require('../../validators/admin/blog.schema')
const path = require('path')
const Controller = require('./../controller')
const { deletePublicImage } = require('../../../utlis/functions')
const { log } = require('console')
const createHttpError = require('http-errors')
const { create } = require('domain')
const { NOTACCESPTABLEINPUT } = require('../../../utlis/constant')
const { array } = require('joi')
class BlogAdminController extends Controller {
    async createPost(req , res , next) { 
        try {
            await createPostValidation.validateAsync(req.body)
            let image = path.join(req.body.fileUploadPath , req.body.filename)
            image = image.replace(/\\/g , "/")
            req.body.image = image ;
            const {title , short_text , category , tags , text} = req.body
            const author = req.user._id
            const post = await BlogModel.create({author ,title , short_text , image , category , tags , text})
            res.status(201).json({
                data : {
                    statusCode : 201 , 
                    msg : "Post has been created successfully"
                }
            })
            
        } catch (error) {
            deletePublicImage(req.body.image)
            next(error)
        }
    }
    async deletePostById(req , res , next) { 
        try {
            const {id} = req.params ;
            await this.findByID(id) ;
            const result = await BlogModel.deleteOne({_id : id})
            if (result.deletedCount == 0) throw createHttpError.InternalServerError("Post didn't deleted")
            res.status(200).json({
                data : {
                    statusCode : 200 ,
                    msg : "Post deleted successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getPostById(req , res , next) { 
        try {
            await idValidation.validateAsync(req.params)
            const {id} = req.params
            const post = await this.findByID(id)
            res.status(201).json({
                data : {
                    statusCode : 201 ,
                    post
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getAllPost(req , res , next) { 
        try {
            const posts = await BlogModel.aggregate([
                {
                    $match : {}
                } ,
                {
                    $lookup : {
                        from : "users" ,
                        localField : "author" ,
                        foreignField : "_id" ,
                        as : "author"
                    }
                } ,
                {
                    $unwind : "$author"
                },
                {
                    $project : {
                        "author.__v" : 0 , 
                        "category.__v" : 0 , 
                        "author.bills" : 0 , 
                        "author.roles" : 0 , 
                        "author.discount" : 0 , 
                        "author.otp" : 0 , 
                    }
                },
                {
                    $lookup :{ 
                        from : "categories" ,
                        localField : "category" ,
                        foreignField : "category" ,
                        as : "category"

                    }
                }
            ])
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
    async editPostById(req , res , next) { 
        try {
            const {id} = req.params ;
            await this.findByID(id)
            const author = req.user._id
            if(req?.body?.fileUploadPath && req?.body?.filename) { 
                req.body.image = path.join(req.body.fileUploadPath , req.body.filename)
                req.body.image = req.body.image.replace(/\\/g , "/")
            }
            const blackList = ['bookmarks' , 'likes' , 'dislikes' , 'comments' , 'author']
            Object.keys(req.body).forEach(key => {
                if(blackList.includes(key)) delete req.body[key]
                if(typeof req.body[key] == "string") req.body[key] = req.body[key].trim()
                if(Array.isArray(req.body[key])) req.body[key] = req.body[key].map(item => item.trim())
                if(NOTACCESPTABLEINPUT.includes(req.body[key])) {
                    delete req.body[key]
                }})
            const result = await BlogModel.updateOne({_id : id} , {$set : req.body})
            if(result.modifiedCount == 0) throw createHttpError.InternalServerError("update failed")
            res.status(200).json({
                data : {
                    statusCode : 200 ,
                    msg : "Updated successfully"
                }
            })
            
        } catch (error) {
            deletePublicImage(req?.body?.image)
            next(error)
        }
    }
    async findByID(id) { 
            const post = await BlogModel.findById({_id:id}).populate([{path : "category" , select : {title:1}} , {path : "author" , select : ['mobile' ,'first_name' , 'last_name' , 'username']}]) ;
            if(!post) throw createHttpError.NotFound("Didn't found any post") ;
            return post
    }
}

module.exports  =  { 
    BlogAdminController : new BlogAdminController
}