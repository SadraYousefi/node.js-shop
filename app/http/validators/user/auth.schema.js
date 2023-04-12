const joi = require('joi')
const authSchema = joi.object({
    //This pattern is created to verify IR(+98) phone number you can create your own
    phone : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("Mobile is not Valid"))
})

module.exports = { 
    authSchema
}