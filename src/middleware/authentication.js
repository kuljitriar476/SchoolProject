const jwt = require("jsonwebtoken");
const teacherModel = require("../model/teacher");
const { ObjectId } = require("mongoose").Types;

const authenticationMiddleware = async function (req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(404).send({
      message: "Token not found/ please provide a token/ login first",
    });
  }

  jwt.verify(token, "secrete_key", function (error, decoded) {
    if (error) {
      return res.status(400).send({
        // message: "token expired please login again/ wrong authentication token",
        message: error.message,
      });
    } else {
      decodedToken = decoded;
    }
  });
  next();
};

const authorizationMiddlewarwe = async (req, res, next) => {
  const teacherId = decodedToken.tracherId;
  console.log("teacherId", teacherId);

  const { id } = req.params;
  console.log("id", id);

  const checkId = await teacherModel.findOne({ _id: new ObjectId(id) });
  if (!checkId) {
    return res.status(404).send({ message: "Teacher not found" });
  }

  if (teacherId !== id) {
    return res.status(400).send({ message: "Authorization failed !!" });
  }

  next();
};

module.exports = { authenticationMiddleware, authorizationMiddlewarwe };
