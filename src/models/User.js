const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Admin", "Visitor", "Student"],
    // whenever we define an enum then our role space is limited it can only take values such as admin , visitor or student ---> other than that it cannot take any other value
  },
});

module.exports = mongoose.model("User", UserSchema);
