const { default: mongoose } = require("mongoose")
const registerModel = require("../models/register.model")
module.exports.userProfileController = async (req, res) => {
  let user = await registerModel.findById(req.params.id)

  console.log(user)
  if (!user) {
    return res.status(400).json({ message: "no user exist!" })
  }

  res.status(200).json(user)
}

module.exports.myCourseController = async (req, res) => {
  const userId = req.params.id // Assuming userId is passed as a parameter

  console.log(userId)
  const objectId = new mongoose.Types.ObjectId(userId)
  try {
    const userWithCourses = await registerModel.aggregate([
      { $match: { _id: { $in: [objectId] } } }, // Match user by ID

      {
        $lookup: {
          from: "courses", // Collection name of courses
          localField: "enrolledCourses",
          foreignField: "_id",
          as: "enrolledCourses",
        },
      },
    ])
    console.log(userWithCourses)

    if (!userWithCourses || userWithCourses.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json(userWithCourses[0]) // Assuming there's only one user, send back the first user document with populated enrolledCourses
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}
