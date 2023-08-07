const mongoose = require("mongoose");
const classes = require("./classes");
const bcrypt= require("bcryptjs");

const { ObjectId } = require("mongoose").Types;

const teachterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  phonNumber: {
    type: String,
    required: true,
  },
  address: {
    addressLine: {
      type: String,
      // required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  role:{
  type:String,
  required:true,
  default:"teacher",
  },
  //classId: {
  // type:mongoose.Schema.Types.ObjectId,
  // ref:"classes",
  //},

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
});
module.exports = mongoose.model("teachter", teachterSchema);
