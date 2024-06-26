const jwt = require("jsonwebtoken")
const registerModel = require("../models/register.model")

module.exports.protect = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
      let user = await registerModel
        .findOne({ email: data.email })
        .select("-password")
      req.user = user

      next()
    } catch (error) {
      res.status(400).json({ message: "Not Authorised" })
    }
  }

  if (!req.cookies.token) {
    res.status(500).json({ message: "Please login to get access" })
  }
}
