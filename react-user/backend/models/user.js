const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone:String,
  password:String,
  role:String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;