const joi = require('joi')
const {MONGOIDPATTERN} = require("./../../../utlis/constant")
const createCategorySchema = joi.object({
    title : joi.string().min(3).max(30).error(new Error ("Title is not true")) ,
    parent : joi.string().allow('').pattern(MONGOIDPATTERN).allow('').error(new Error("Parent is not true"))
})

const updateCategorySchema = joi.object({
    title : joi.string().min(3).max(30).error(new Error ("Title is not true")) ,
})
module.exports = { 
    createCategorySchema,
    updateCategorySchema,
}