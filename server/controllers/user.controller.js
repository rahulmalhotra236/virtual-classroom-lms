const registerModel = require("../models/register.model")
module.exports.userProfileController = async (req, res) => {
  let user = await registerModel.findById(req.params.id)

  console.log(user)
  if (!user) {
    return res.status(400).json({ message: "no user exist!" })
  }

  res.status(200).json(user)
}
