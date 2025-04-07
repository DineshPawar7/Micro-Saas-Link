const mongoose = require("mongoose");

const clickLogSchema = new mongoose.Schema({
  alias: { type: String, required: true },
  ip: String,
  device: String,
  browser: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClickLog", clickLogSchema);
