const express = require("express");
const router = express.Router();

//CRUD student

const studentController = require("../controller/student");
//const student = require("../model/teacher");

const middleware = require("../middleware/authentication");

router.post("/student", studentController.createStudent);
router.get("/student", studentController.getAllStudent);
router.get("/student/:id", studentController.singleStudent);
router.put("/student/:id", studentController.updateStudent);
router.delete("/student/:id", studentController.deleteStudent);

//CRUD teacher

const teacherController = require("../controller/teacher");
const teacher = require("../model/teacher");
//const teacher = require("../mondel/teacher");

router.post("/teacher", teacherController.createTeacher);
router.get(
  "/teacher",
  middleware.authenticationMiddleware,
  middleware.authenticationMiddleware2,
  teacherController.getAllTeacher
);
router.put(
  "/teacher/:id",
  middleware.authenticationMiddleware,
  middleware.authenticationMiddleware2,
  teacherController.updataTeacher
);

router.get(
  "/teacher/:id",
  middleware.authenticationMiddleware,
  middleware.authenticationMiddleware2,
  teacherController.singleTeacher
);
router.delete("/teacher/:id", teacherController.deleteTeacher);
router.post("/teacher/login", teacherController.loginTeacher);

//CRUD classes

const classesController = require("../controller/classes");
const classes = require("../model/classes");

router.post("/classes", classesController.createclasses);
router.get("/classes", classesController.getAllClasses);
router.put("/classes/:id", classesController.updateClasses);
router.get("/classes/:id", classesController.singleClasses);
router.delete("/classes/:id", classesController.deleteClasses);

//CRUD section

const sectionController = require("../controller/section");
const section = require("../model/section");

router.post("/section", sectionController.creacteSection);
router.get("/section", sectionController.getAllSection);
router.get("/section/:id", sectionController.singleSection);
router.put("/section/:id", sectionController.updateSection);
router.delete("/section/:id", sectionController.deleteSection);

//CRUD manager

const managerController = require("../controller/manager");
const manager = require("../model/manager");

router.post("/manager", managerController.createManager);
router.get("/manager", managerController.getAllManager);
router.get("/manager/:id", managerController.singleManager);
router.put("/manager/:id", managerController.updateManager);
router.delete("/manager/:id", managerController.deletemanager);

// CRUD Employs

const employsController = require("../controller/employs");
const employs = require("../model/employs");

router.post("/employs", employsController.createEmploys);
router.get("/employs", employsController.getAllEmploys);
router.get("/employs/:id", employsController.singleEmploys);
router.put("/employs/:id", employsController.updateEmploys);
router.delete("/employs/:id", employsController.deleteEmploys);

module.exports = router;
