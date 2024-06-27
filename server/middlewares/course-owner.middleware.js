const registerModel = require("../models/register.model")
module.exports.courseOwner = async (req, res, next) => {
  try {
    if (req.user.role === "teacher") {
      next()
    } else {
      return res
        .status(400)
        .json({ message: "you are not allowed to create course" })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error in create-course middleware! ${error.message}` })
  }
}
