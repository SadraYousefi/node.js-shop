const httpStatus = require("http-status");
const { UserModel } = require("../../../../models/user");
const Controller = require("../../controller");
const { deleteInvalidObjectData } = require("../../../../utlis/functions");
const createHttpError = require("http-errors");

class AdminUserController extends Controller {
    async getAllUsers(req,res,next){
        try {
            const {search} = req.query
            const searchQuery = {}
            if(search) searchQuery['$text'] = {$search : search}
            const users = await UserModel.find(searchQuery) ;
            res.status(httpStatus.OK).json({
                statusCode: httpStatus.Ok ,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateUserProfile(req,res,next){
        try {
            const userID = req.user._id
            const data = req.body
            let allowedField = ['first_name' , 'last_name' , 'password' , 'username' , 'email' , 'birthday']
            deleteInvalidObjectData(data , allowedField)
            const profileUpdateResult = await UserModel.updateOne({_id: userID} , {$set : data })
            if(!profileUpdateResult) throw new createHttpError.InternalServerError("update was not successful")
            return res.status(httpStatus.OK).json({
                statuCode: httpStatus.OK , 
                data: {
                    msg: "updated successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async userProfile(req,res,next){
        try {
            const user = req.user ;
            res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK ,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { 
    AdminUserController : new AdminUserController ,
}