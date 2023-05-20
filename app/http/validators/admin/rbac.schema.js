const joi = require('joi')
const { MONGOIDPATTERN } = require('../../../utlis/constant')

const createRoleSchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("Role title is not valid")) ,
    permissions: joi.array().items(joi.string().pattern(new RegExp(MONGOIDPATTERN))).error(new Error('This is not mongoID')) ,
})
const addPermissionsSchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("Permission title is not valid")) ,
    description: joi.string().min(3).max(30).error(new Error("description is not valid")) ,
})
module.exports = { 
    createRoleSchema ,
    addPermissionsSchema ,
}