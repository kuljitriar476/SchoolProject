const mongoose = require("mongoose");
const facilityModel = require("../model/facility");
const { ObjectId } = require("mongoose").Types;

const createFacility = async function (req, res) {
  try {
    const data = req.body;
    const { facility } = data;
    const facilityData = new facilityModel({
      facility,
    });
    await facilityData.save();
    res.status(200).send({
      message: "facility created successfully",
      data: facilityData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllFacility = async function (req, res) {
  try {
    const data = await facilityModel.find();
    res.status(200).send({
      message: "get all fetch successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleFacility = async function (req, res) {
  try {
    const { id } = req.params;
    const facilityData = await facilityModel.findOne({ _id: new ObjectId(id) });
    res.status(200).send({
      message: "single facility created successfully",
      data: facilityData,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateFacility = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const { facility } = data;
    const facilityData = await facilityModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        facility,
      },
      { new: true }
    );
    res.status(200).send({
      message: "facility data is update",
      data: facilityData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createFacility,
  getAllFacility,
  singleFacility,
  updateFacility,
};
