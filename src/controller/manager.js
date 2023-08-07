const mongoose = require("mongoose");
const managerModel = require("../model/manager");
const { ObjectId } = require("mongoose").Types;

const createManager = async function (req, res) {
  try {
    const data = req.body;
    const { name, lastName, number, email, employsId } = data;

    const managerData = new managerModel({
      name,
      lastName,
      number,
      email,
      employsId,
    });
    await managerData.save();
    res.status(200).send({
      message: "manager created successfully",
      data: managerData,
    });
  } catch (error0) {
    console.log(error);
  }
};

const getAllManager = async function (req, res) {
  try {
    // const data = await managerModel.find();
    const managerData = await managerModel.aggregate([
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "employs",
                localField: "_id",
                foreignField: "managerId",
                as: "employsDetails",
              },
            },
            // {
            //     $unwind:{
            //         path:"$employsDetails",
            //         preserveNullAndEmptyArrays:true,
            //     }
            // }
          ],
        },
      },
    ]);
    res.status(200).send({
      message: "getAllManager fetch successfully",
      data: managerData,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleManager = async function (req, res) {
  try {
    const { id } = req.params;
    const manager = await managerModel.findOne({ _id: new ObjectId(id) });
    res.status(200).send({
      message: "single manager created successfully",
      data: manager,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateManager = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const { name, lastName, number, email } = data;
    const managerData = await managerModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        name,
        lastName,
        number,
        email,
      },
      { new: true }
    );
    res.status(200).send({
      message: "manager data update successfully",
      data: managerData,
    });
  } catch (error) {
    console.log(error);
  }
};

const deletemanager = async function (req, res) {
  try {
    const { id } = req.params;
    const sortData = await managerModel.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({
      message: "manager deleted successfully",
      data: sortData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createManager,
  getAllManager,
  singleManager,
  updateManager,
  deletemanager,
};
