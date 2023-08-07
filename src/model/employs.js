const mongoose= require("mongoose");
const ObjectId = require("mongoose/lib/types/objectid");

const employsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    managerId:{
        type:ObjectId,
        ref:"managers",
    },
});
module.exports= mongoose.model("employs", employsSchema);