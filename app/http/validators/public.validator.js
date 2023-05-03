const joi = require('joi')
const createHttpError = require('http-errors')
const { MONGOIDPATTERN } = require('../../utlis/constant')

const idValidator = joi.object({
    id : joi.string().pattern(MONGOIDPATTERN).error(new createHttpError.BadRequest("id is not valid mongodb id"))
})

module.exports = { 
    idValidator
}