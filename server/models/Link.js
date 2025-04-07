const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  longURL: { type: String, required: true },
  shortAlias: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  expirationDate: Date,
  clickCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Link", linkSchema);
