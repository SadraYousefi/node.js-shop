const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  parent :{type : mongoose.Types.ObjectId , ref: "category ", default : undefined}
} , { 
  id : false ,
  toJSON : {
    virtuals : true
  }
});

Schema.virtual("children" , { 
  ref : "category" ,
  localField : "_id" ,
  foreignField : "parent"
})

Schema.pre('findOne' , function(next) {
  this.populate([{path : "children"}])
  next()
}).pre('find' ,function(next) {
  this.populate([{path : "children"}])
  next()
} )

module.exports = {
  CategoryModel: mongoose.model("category", Schema),
};
