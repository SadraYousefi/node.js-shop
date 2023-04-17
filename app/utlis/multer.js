const multer = require("multer")
const path = require('path')
const fs = require('fs');
const createHttpError = require("http-errors");
const createRoute = (req) => {
    const date = new Date() ;
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDay().toString()
    const directory =  path.join(__dirname , ".." , ".." , "public" , "uploads" , "blog" , year , month , day)
    req.body.fileUploadPath = path.join("uploads" , "blog" , year , month , day)
    fs.mkdirSync(directory , {recursive : true})
    return directory
}
const storage = multer.diskStorage({
    destination : (req , file , cb)=> { 
        const filepath = createRoute(req); 
        cb(null , filepath)

    } ,
    filename : (req , file , cb) => {
        const ext = path.extname(file.originalname);
        const filename = String(Date.now() + ext)
        req.body.filename = filename
        cb(null , filename)
    }
})

function fileFilter (req , file , cb) { 
    const ext = path.extname(file.originalname)
    const allowedext = ['.png' , '.jpeg' , '.jpg' , '.gif' ,'.webp']
    if(!allowedext.includes(ext)) {return cb(createHttpError.BadRequest('Your file ext is not allowed'))}
    return cb(null , true)
}

const uploadFile = multer({storage , fileFilter})

module.exports = {
    uploadFile
}