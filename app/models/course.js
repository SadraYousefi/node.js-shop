const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./global.schemas");
const { getCourseTime } = require("../utlis/functions");
require("dotenv").config()
const Episode = new mongoose.Schema({
  title: { type: String, requried: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
  videoAddress: {type: String , required: true}
});

const Chapter = new mongoose.Schema({
  title: { type: String, requried: true },
  text: { type: String, default: "" },
  episodes: { type: [Episode], default: [] },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category" },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], defualt: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  status: {type : String , default : "notStarted"} ,
  discount: { type: Number, default: 0 },
  type: { type: String, default: "free", required: true }, // Premium , Free , forSale
  teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  chapters: { type: [Chapter], defualt: [] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
} , {
  toJSON : {virtuals : true}
});
CourseSchema.index({
  title : "text" ,
  text : "text" ,
  text : "text"
})
CourseSchema.virtual("totalTime").get(function () { 
  return getCourseTime(this.chapters || [])
})
CourseSchema.virtual("imageURL").get(function () { 
  return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`
})
module.exports = {
  CourseModel : mongoose.model("course", CourseSchema),
};
