const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./global.schemas");

const Episode = new mongoose.Schema({
  title: { type: String, requried: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});

const Chapter = new mongoose.Schema({
  title: { type: String, requried: true },
  text: { type: String, default: "" },
  episodes: { type: [Episode], default: [] },
});

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category" },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], defualt: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: { type: String, default: "free", required: true }, // Premium , Free , forSale
  time: { type: String, default: "00:00:00" },
  teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  chapter: { type: [Chapter], defualt: [] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
});
module.exports = {
  ProductModel: mongoose.model("course", Schema),
};