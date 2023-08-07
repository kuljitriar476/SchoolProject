const classes = require("../model/classes");
const student = require("../model/student");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const createStudent = async function (req, res) {
  try {
    const data = req.body;
    const {
      name,
      lastName,
      phonNumber,
      email,
      rollNumber,
      course,
      teacherId,
      classId,
    } = data;
    const studentData = new student({
      name,
      lastName,
      phonNumber,
      email,
      rollNumber,
      course,
      teacherId,
      //address,
      classId,
    });
    await studentData.save();
    res.status(200).send({
      message: "student data created successfully",
      data: studentData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudent = async function (req, res) {
  try {
    // const data = await student.find();
    const studentData = await student.aggregate([
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "classes",
                localField: "classes",
                foreignField: "_id",
                as: "studeDetails",
              },
            },
            {
              $unwind: {
                path: "$studentsDetail",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "sectionDetail",
              },
            },
            {
              $unwind: {
                path: "$sectionDetail",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "teachers",
                localField: "teacher",
                foreignField: "_id",
                as: "teacherDetail",
              },
            },
          ],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);
    res.status(200).send({
      message: "get all student fetch successfully",
      count: studentData[0]?.count[0]?.total,
      data: studentData[0]?.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleStudent = async function (req, res) {
  try {
    const { id } = req.params;
    const sortData = await student.findOne({ _id: new ObjectId(id) });
    res.status(200).send({
      message: "single student created successfully",
      data: sortData,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const {
      name,
      lastName,
      phonNumber,
      email,
      rollNumber,
      course,
      address,
      teacherId,
      //address,
      classId,
    } = data;

    const studentData = await student.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        name,
        lastName,
        phonNumber,
        email,
        rollNumber,
        course,
        address,
        teacherId,
        //address,
        classId,
      },
      { new: true }
    );
    res.status(200).send({
      message: "student data update successfuly",
      data: studentData,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async function (req, res) {
  try {
    const { id } = req.params;
    const studentData = await student.findOneAndDelete({
      _id: new ObjectId(id),
    });
    res.status(200).send({
      message: "student deleted successfully",
      data: studentData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createStudent,
  getAllStudent,
  singleStudent,
  updateStudent,
  deleteStudent,
};
