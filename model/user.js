const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minLength: [2, "Too short, {MINLENGTH} letters minimum"],
    maxLength: [64, "Too long, {MAXLENGTH} letters max "],
    required: "Firstname is required",
  },
  lastname: {
    type: String,
    minLength: [2, "Too short, {MINLENGTH} letters minimum"],
    maxLength: [64, "Too long, {MAXLENGTH} letters max "],
    required: "Lastname is required",
  },
  email: {
    type: String,
    required: "Email is required",
    validate: {
      validator: (v) => {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: "Password is required",
    minLength: [8, "{MINLENGTH} letters minimum"],
    maxLength: [64, "{MAXLENGTH} letters maximum"],
  },
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
