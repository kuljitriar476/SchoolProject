const mongoose = require("mongoose");
const classes = require("./classes");
const section = require("./section");
const teacher = require("./teacher");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phonNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: Number,
      // required:true,
    },
    // course: {
    //   type: String,
    //   required: true,
    // },
    address: {
      type: String,
      //  required:true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teachter",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);
