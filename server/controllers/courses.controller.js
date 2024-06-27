const { default: mongoose } = require("mongoose")
const courseModel = require("../models/courses.model")
const registerModel = require("../models/register.model")

module.exports.createCourseController = async (req, res) => {
  console.log(req.body)
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
    if (!courses.length) {
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

module.exports.editCoursesController = async (req, res) => {
  try {
    // get fields want to edit
    const { title, description, tags, price } = req.body

    // Find the course by ID and update it
    const course = await courseModel.findByIdAndUpdate(req.params.id, {
      title,
      description,
      tags,
      price,
    })

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    res.status(200).json(course) // Send back the updated course
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

module.exports.deleteCoursesController = async (req, res) => {
  let deletedCourse = await courseModel.findByIdAndDelete(req.params.id)

  if (!deletedCourse) {
    return res.status(400).json({ message: "no such course found for delete!" })
  }

  res.status(200).json({ message: "course is deleted successfully!" })
}

module.exports.enrollCoursesController = async (req, res) => {
  let course = await courseModel.findOne({ _id: req.params.id })
  if (!course) {
    return res.status(400).json({ message: "no such course found" })
  }

  let user = await registerModel.findOne({ email: req.user.email })
  console.log(user)
  if (!user) {
    return res.status(400).json({ message: "not such user exist" })
  }

  user.enrolledCourses.push(user._id)
  course.enrolledUsers.push(course._id)
  await user.save()
  await course.save()
  res.status(200).json(user)
}
