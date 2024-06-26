const courseModel = require("../models/courses.model")
const registerModel = require("../models/register.model")

module.exports.createCourseController = async (req, res) => {
  let { title, description, tags, price } = req.body
  if (!title || !description || !tags || !price) {
    return res
      .status(400)
      .json({ message: "please fill all reruired details!" })
  }

  let user = await registerModel.findOne({ email: req.user.email })

  // if (user.role === "teacher") {
  const newCourse = await courseModel.create({
    title,
    description,
    tags,
    price,
    owner: user._id,
  })
  user.courses.push(newCourse._id)
  await user.save()
  res.status(200).json({ message: "course created successfully!" })
  // } else {
  //   return res.status(400).json({ message: "only teacher can create courses!" })
  // }
}

module.exports.getAllCoursesController = async (req, res) => {
  let user = await registerModel.findOne({ email: req.user.email })

  if (!user) {
    return res.status(400).json({ message: "no user found - Please login!" })
  }

  let courses = await courseModel.find()
  res.status(200).json(courses)
}
