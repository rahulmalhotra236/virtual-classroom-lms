// models/Course.js

const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // Assuming User model exists
    price: {
      type: Number,
      default: 0,
    },
    enrolledUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
)

const Course = mongoose.model("Course", courseSchema)

module.exports = Course
