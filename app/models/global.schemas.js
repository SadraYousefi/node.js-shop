const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  parent: { type: mongoose.Types.ObjectId, default: undefined, ref: "comment" },
});

module.exports = {
  CommentSchema,
};
