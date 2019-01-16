const mongoose = require("mongoose");
const userSchema = require("../schemas/User");

module.exports = User = mongoose.model("User", userSchema);
