const mongoose = require("mongoose");

var picturesSchema = mongoose.Schema({
  url: String,
  desc: String,
  date: String,
  like: String,
  public_path: String,
});


var usersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token : String,
  date_inscription: Date,
  avatar: Array,
  pictures : [picturesSchema],
});


var usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;