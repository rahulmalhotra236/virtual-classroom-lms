const express = require("express")
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller")
const {
  getAllCoursesController,
  createCourseController,
  getSingleCoursesController,
} = require("../controllers/courses.controller")
const { createCourse } = require("../middlewares/create-course.middleware")
const { protect } = require("../middlewares/protect.middleware")

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/logout", logoutController)

router.post("/create-course", protect, createCourse, createCourseController)
router.get("/courses", protect, getAllCoursesController)
router.get("/courses/:id", protect, getSingleCoursesController)

module.exports = router
