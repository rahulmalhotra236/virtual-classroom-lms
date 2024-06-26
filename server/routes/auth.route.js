const express = require("express")
const {
  registerController,
  loginController,
  logoutController,
  deleteUserController,
} = require("../controllers/auth.controller")
const {
  getAllCoursesController,
  createCourseController,
  getSingleCoursesController,
  editCoursesController,
  deleteCoursesController,
  enrollCoursesController,
} = require("../controllers/courses.controller")
const {
  userProfileController,
  myCourseController,
} = require("../controllers/user.controller")
const { courseOwner } = require("../middlewares/course-owner.middleware")
const { protect } = require("../middlewares/protect.middleware")

const router = express.Router()

//auth
router.post("/register", registerController)
router.post("/login", loginController)
router.get("/logout", logoutController)
router.get("/:id/delete", deleteUserController)

//user
router.get("/:id/profile", userProfileController)
router.get("/:id/my-courses", myCourseController)

//course
router.post("/create-course", protect, courseOwner, createCourseController)
router.get("/courses", protect, getAllCoursesController)
router.post("/courses/:id/enroll", protect, enrollCoursesController)
router.get("/courses/:id", protect, getSingleCoursesController)
router.post("/courses/:id/edit", protect, courseOwner, editCoursesController)
router.get("/courses/:id/delete", protect, courseOwner, deleteCoursesController)

module.exports = router
