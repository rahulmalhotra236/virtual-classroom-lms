const mongoose = require("mongoose")

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to db...")
  } catch (error) {
    console.log(`Error in connecting DB: ${error}`)
  }
}

module.exports = dbConnection
