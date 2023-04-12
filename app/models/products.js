const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  short_desk: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId },
  comments: { type: [], default: [] },
  like: { type: [mongoose.Types.ObjectId], defualt: [] },
  dislike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: { type: String },
  format: { type: String },
  time: { type: String },
  teacher: { type: mongoose.Types.ObjectId, required: true },
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
