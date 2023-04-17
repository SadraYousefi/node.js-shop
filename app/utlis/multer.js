const multer = require("multer")
const path = require('path')
const fs = require('fs')
const createRoute = () => {
    const date = new Date() ;
    const year = date.getFullYear().toString()
    const month = data.getMonth().toString()
    const day = data.getDay().toString()
    const directory =  path.join(__dirname , ".." , ".." , "public" , "uploads" , "blog" , year , month , day)
    fs.mkdirSync(directory , {recursive : true})
    return directory
}
const storage = multer.diskStorage({
    destination : (req , file , cb)=> { 
        const filepath = createRoute(); 
        cb(null , filepath)

    } ,
    filename : (req , file , cb) => {
        const ext = path.extname(file.originalname);
        const filename = String(Date.now() + ext)
        cb(null , filename)
    }
})

const uploadFile = multer({storage})

module.exports = {
    uploadFile
}