const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const dbConnection = require("./config/db")
const authRoute = require("./routes/auth.route")
const cookieParser = require("cookie-parser")

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/v1", authRoute)

dbConnection()

app.listen(process.env.PORT, () => {
  console.log(`server is running at PORT ${process.env.PORT}`)
})
