const mongoose = require("mongoose");
const employsModel = require("../model/employs");
const { find } = require("../model/classes");
const { ObjectId } = require("mongoose").Types;

const createEmploys = async function (req, res) {
  try {
    const data = req.body;
    const { name, lastName, number, email,managerId} = data;
    const employsData = await employsModel({
      name,
      lastName,
      number,
      email,
      managerId
      
    });
    await employsData.save();
    res.status(200).send({
      message: "employs data created successfully",
      data: employsData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllEmploys = async function (req, res) {
  try {
  //  const employsData = await employsModel.find();
   const employsData= await employsModel.aggregate([
    {
      $facet:{
        data:[
          {
            $lookup:{
              from:"managers",
              localField:"managerId",
              foreignField:"",
              as:"employs"
            }
          }
        ]
      }
    }
   ])
    res.status(200).send({
      message: "get All employs fetch successfully",
      data: employsData,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleEmploys = async function (req, res) {
  try {
    const { id } = req.params;
    const sortData = await employsModel.findOne();
    res.status(200).send({
      message: "single employs created successfully",
      data: sortData,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateEmploys = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const { name, lastName, number, email } = data;

    console.log(name, "name");
    const employsData = await employsModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        name,
        lastName,
        number,
        email,
      },
      { new: true }
    );

    console.log(employsData, "data");
    res.status(200).send({
      message: "employs data update successfuuly",
      data: employsData,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteEmploys = async function (req, res) {
  try {
    const { id } = req.params;
    const employsData = await employsModel.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({
      message: "employs delete successfully",
      data: employsData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createEmploys,
  singleEmploys,
  getAllEmploys,
  updateEmploys,
  deleteEmploys,
};
