const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./global.schemas");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId , ref : "category" },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], defualt: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String }, // Virtual or phisyical
  time: { type: String },
  supplier: { type: mongoose.Types.ObjectId, required: true },
  features: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      weight: "",
      color: "",
      model: "",
      making: "",
    },
  },
});
module.exports = {
  ProductModel: mongoose.model("product", Schema),
};
