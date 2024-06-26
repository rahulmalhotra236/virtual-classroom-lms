const express = require("express")
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller")
const {
  getAllCoursesController,
  createCourseController,
} = require("../controllers/courses.controller")
const { createCourse } = require("../middlewares/create-course.middleware")
const { protect } = require("../middlewares/protect.middleware")

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)

router.post("/create-course", protect, createCourse, createCourseController)
router.get("/courses", protect, getAllCoursesController)

module.exports = router
