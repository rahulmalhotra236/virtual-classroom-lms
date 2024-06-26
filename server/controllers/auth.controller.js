const registerModel = require("../models/register.model")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

module.exports.registerController = async (req, res) => {
  try {
    // all fields are requried
    let { username, email, password, role } = req.body
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "please fill details!" })
    }
    // check if user already exist or not
    let user = await registerModel.findOne({ email: req.body.email })

    if (user) {
      return res.status(500).json({ message: "user already exist!" })
    }

    // hashing password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // creating new user
    let newUser = await registerModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    })

    //creating JWT (Json Web Token)
    const token = generateToken({ email: req.body.email })

    //save this token in cookies of browser
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ message: "user created successfully!", token })
  } catch (error) {
    res.status(400).json(`Error in registerController: ${error.message}`)
  }
}

module.exports.loginController = async (req, res) => {
  try {
    // all fields are requried
    let { email, password, role } = req.body
    if (!email || !password || !role) {
      return res.status(400).json({ message: "please fill details!" })
    }
    // check if user exist or not
    let user = await registerModel.findOne({
      $and: [{ email: req.body.email }, { role: req.body.role }],
    })
    if (!user) {
      return res.status(400).json({ message: "no such user exist!" })
    }

    //check if password is correct or not
    let isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "incorrect password!" })
    }

    //creating JWT (Json Web Token)
    const token = generateToken({ email: req.body.email })

    //save this token in cookies of browser
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    //login
    user = await registerModel.findOne({ email: req.body.email })
    res.status(200).json({ message: "login successfully!" })
  } catch (error) {
    res.status(400).json(`Error in loginController: ${error.message}`)
  }
}

module.exports.logoutController = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
    })
    .json({ message: "user logged out!" })
}
