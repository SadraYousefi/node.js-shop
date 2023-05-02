const { databasePathMaker } = require("../../utlis/functions");

function filestoArray(req , res , next) {
      Object.keys(req.files).forEach(item => {
        req.files[item].address = databasePathMaker(
          req.body.fileUploadPath,
          req.files[item].filename
        );
      })
      let images = []
      for ( const item of req.files) { 
        images.push(item.address)
      }
      req.images = images
      next()
}

module.exports = { 
    filestoArray
}