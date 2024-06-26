const { default: mongoose } = require("mongoose")
const courseModel = require("../models/courses.model")
const registerModel = require("../models/register.model")

module.exports.createCourseController = async (req, res) => {
  try {
    //all fields required
    let { title, description, tags, price } = req.body
    if (!title || !description || !tags || !price) {
      return res
        .status(400)
        .json({ message: "please fill all reruired details!" })
    }

    //find user
    let user = await registerModel.findOne({ email: req.user.email })

    //creating new course
    const newCourse = await courseModel.create({
      title,
      description,
      tags,
      price,
      owner: user._id, //add ownser id in new course
    })

    //push new course id in User
    user.courses.push(newCourse._id)
    await user.save()
    res.status(200).json({ message: "course created successfully!" })
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error in createCourseController ${error.message}` })
  }
}

module.exports.getAllCoursesController = async (req, res) => {
  try {
    //check does user exist
    let user = await registerModel.findOne({ email: req.user.email })

    if (!user) {
      return res.status(400).json({ message: "no user found - Please login!" })
    }

    //find all course
    let courses = await courseModel.find()
    if (!courses) {
      return res.status(400).json({ message: "no courses found!" })
    }
    res.status(200).json(courses)
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error in getAllCoursesController${error.message}` })
  }
}
module.exports.getSingleCoursesController = async (req, res) => {
  try {
    //check user exist
    let user = await registerModel.findOne({ email: req.user.email })

    if (!user) {
      return res.status(400).json({ message: "no user found - Please login!" })
    }

    //find course by Id
    let course = await courseModel.findById(req.params.id)
    if (!course) {
      return res.status(400).json({ message: "no course found!" })
    }

    res.status(200).json(course)
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error in getSingleCoursesController ${error.message}` })
  }
}
