const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema({
  className: {
    type: String,
    required:true,
  },
  classRoom:{
    type:Number,
    required:true,
  },
  flor:{
    type:String,
    required:true,
  },
  capacity:{
   type:Number,
    required:true,
  },
},
{timesTamps:true},
);

module.exports= mongoose.model("class", classesSchema);
