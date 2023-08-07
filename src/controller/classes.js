const { status } = require("init");
const classes = require("../model/classes");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const createclasses = async function (req, res) {
  try {
    const data = req.body;
    const { className, classRoom, flor, type, capacity } = data;
    const classesData = new classes({
      className,
      classRoom,
      flor,
      type,
      capacity,
    });
    await classesData.save();
    res.status(200).send({
      message: "classes created successfully",
      data: classesData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllClasses = async function (req, res) {
  try {
   // const data = await classes.find();
   
    res.status(200).send({
      message: "All classes fetch successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClasses = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const { className, classRoom, flor, type, capacity } = data;
    const classesData = await classes.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        className,
        classRoom,
        flor,
        type,
        capacity,
      },
      { new: true }
    );
    res.status(200).send({
      message: "classes update successfully",
      data: classesData,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleClasses = async function(req,res){
    try{
 const {id}= req.params;
 const sortData= await classes.findOne(
    {_id:new ObjectId(id)}
 );
 res.status(200).send({
    message:"single classes created successfuly",
    data:sortData
 });
    }catch (error)
    {
    console.log(error);
    }
};

const deleteClasses = async function(req,res){
    try{
const {id} = req.params;
const classesData= await classes.findOneAndDelete(
    {_id:new ObjectId(id)},
    {new:true}
);
res.status(200).send({
    message:"delete classes successfully",
    data:classesData
});
    }catch (error){
        console.log(error);
    }
};

module.exports = {
  createclasses,
  getAllClasses,
  updateClasses,
  singleClasses,
  deleteClasses,
};
