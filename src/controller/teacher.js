const { default: mongoose } = require("mongoose");
const teacherModel = require("../model/teacher");
const bcrypt = require("bcryptjs");
const teacher = require("../model/teacher");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;

const createTeacher = async function (req, res) {
  try {
    const data = req.body;
    const {
      name,
      lastName,
      email,
      phonNumber,
      password,
      address,
      //teacherId,
      // classId,
      studentId,
    } = data;

    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(password, salt);
    const teacherData = new teacherModel({
      name,
      lastName,
      email,
      phonNumber,
      password: hassPassword,
      address,
      //teacherId,
      // classId,
      studentId,
    });
    await teacherData.save();
    res.status(200).send({
      message: "teacher created successfuly",
      data: teacherData,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginTeacher = async function (req, res) {
  try {
    const data = req.body;
    const { email, password } = data;
    const teacherData = await teacherModel.findOne({ email: email });
    if (!teacherData) {
      res.status(400).send({ message: `this ${email} dose't exist ` });
    }
    if (teacherData?.role != "teacher") {
      res.status(200).send({ message: "you dose't have exist" });
    }
    console.log("teacherData", teacherData);
    const chackPassword = await bcrypt.compare(password, teacherData?.password);
    if (!chackPassword) {
      res.status(400).send({ message: "wrong password pless try again" });
    }

    console.log("chackPassword", chackPassword);

    const token = jwt.sign(
      {
        tracherId: teacherData?._id,
        name: teacherData.name,
        lastName: teacherData.lastName,
        email: teacherData.email,
        role: teacherData.role,
        // name: "kuljit riar",
        // rollNumber: "20",
        // age: 15,
        // clg: "xyz",
      },
      "secrete_key",
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "login successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTeacher = async function (req, res) {
  try {
    //const data = await teacherModel.find();

    const teacherData = await teacherModel.aggregate([
      {
        $facet: {
          data: [
            { $match: {} },
            {
              $lookup: {
                from: "students",
                localField: "_id",
                foreignField: "teacherId",
                as: "studentDetail",
              },
            },
            // {
            //   $unwind: {
            //     path: "$studentDetail",
            //     preserveNullAndEmptyArrays: true,
            //   },
            // },
            // {
            //   $lookup:{
            //       from:"classes",
            //      localField:"classId",
            //     foreignField:"_id",
            //     as:"classesDetail",
            // },
            // },
            //{
            //   $unwind:{
            //   path:"$classesDetail",
            //  preserveNullAndEmptyArrays:true,
            // },
            //},
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
      message: "get all data  fetch successfuly",
      count: teacherData[0]?.count[0]?.total,
      data: teacherData[0]?.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const updataTeacher = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const {
      name,
      lastName,
      email,
      phonNumber,
      password,
      address,
      teacherId,
      classId,
      studentId,
    } = data;
    const teacherData = await teacherModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        name,
        lastName,
        email,
        phonNumber,
        password,
        address,
        teacherId,
        classId,
        studentId,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "teacher data update successfully",
      data: teacherData,
    });
  } catch (error) {
    console.log(error);
  }
};

const singleTeacher = async function (req, res) {
  try {
    const { id } = req.params;
    const sortData = await teacherModel.findOne({ _id: new ObjectId(id) });
    res.status(200).send({
      message: "single teacher successfully",
      data: sortData,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTeacher = async function (req, res) {
  try {
    const { id } = req.params;
    const teacherData = await teacherModel.findOneAndDelete(
      { _id: new ObjectId(id) },
      { new: true }
    );
    res.status(200).send({
      message: "teacher data deleted successfuly",
      data: teacherData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTeacher,
  getAllTeacher,
  updataTeacher,
  singleTeacher,
  deleteTeacher,
  loginTeacher,
};
