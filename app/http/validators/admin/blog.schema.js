const joi = require('joi')
const { MONGOIDPATTERN } = require('../../../utlis/constant')

const createPostValidation = joi.object({
    title : joi.string().min(3).max(30).error(new Error('Title is not valid')) ,
    text : joi.string().error(new Error('text is not valid')),
    short_text : joi.string().error(new Error('Short text is not valid')),
    filename : joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(new Error('Image is not valid')),
    category : joi.string().pattern(MONGOIDPATTERN).error(new Error('Short text is not valid')),
    tags : joi.array().min(0).max(20).error(new Error("Tags Cant be more than 20")),
    fileUploadPath : joi.allow()
})

module.exports = { 
    createPostValidation
}