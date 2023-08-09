const mongoose = require("mongoose");

const fecultySchema = new mongoose.Schema({
  // library:{
  //     type: String,
  //     required:true,
  // },
  // playGround:{
  //     type:String,
  //     required:true,
  // },
  // mettingRoom:{
  //     type:String,
  //     required:true,
  // },
  // garden:{

  // }

  facility: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("facility", fecultySchema, "facility");
